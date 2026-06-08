import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../drizzle/schema";
import { projects, buckets, tasks, steps } from "../drizzle/schema";
import { eq, and, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Load environment variables using absolute path
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const pool = new Pool({
    connectionString: process.env.DB_URL
});

pool.on('error', (err) => {
    // Prevent unhandled pg pool errors from crashing the process
    console.error('Unexpected database pool error:', err);
});

const db = drizzle(pool, { schema });

// Initialize the Time-Boxing MCP Server
const server = new McpServer({
    name: "time-boxing-mcp",
    version: "1.0.0",
});

// ==========================================
// 1. CREATE TOOLS
// ==========================================

// Tool to handle deep-creation of a project, its buckets, and initial tasks
server.registerTool(
    "create_project_workspace",
    {
        description: "Creates a new project, initializes its Kanban columns (buckets), and populates initial tasks.",
        inputSchema: z.object({
            name: z.string().describe("The name of the project."),
            userId: z.string().describe("The ID of the user creating the project."),
            teamId: z.string().optional().describe("The team ID if this is a collaborative project."),
            buckets: z.array(z.string()).default(["To Do", "In Progress", "Completed"])
                .describe("The column/bucket names for the Kanban board layout."),
            initialTasks: z.array(
                z.object({
                    title: z.string(),
                    bucketName: z.string().describe("Which bucket from the buckets array to place this task in."),
                    note: z.string().optional(),
                    startDate: z.string().optional().describe("YYYY-MM-DD format"),
                    endDate: z.string().optional().describe("YYYY-MM-DD format"),
                    entitlementScore: z.number().default(1),
                    steps: z.array(z.string()).optional().describe("Sub-steps or checklist items for this task.")
                })
            ).optional()
        })
    },
    async (params) => {
        try {
            const projectId = uuidv4();
            const now = new Date();

            // 1. Insert into 'projects' table
            await db.insert(projects).values({
                id: projectId,
                name: params.name,
                user_id: params.userId || null,
                team_id: params.teamId || null,
                created_at: now,
                updated_at: now,
            });

            // 2. Loop and insert into 'buckets' table with generated project_id and order index
            const bucketIds: Record<string, string> = {};
            for (let i = 0; i < params.buckets.length; i++) {
                const bName = params.buckets[i];
                const bucketId = uuidv4();
                await db.insert(buckets).values({
                    id: bucketId,
                    name: bName,
                    order: i,
                    project_id: projectId,
                    created_at: now,
                    updated_at: now,
                });
                bucketIds[bName] = bucketId;
            }

            // 3. Loop through initialTasks, find matched bucket_id, insert into 'tasks'
            let tasksCreatedCount = 0;
            let stepsCreatedCount = 0;
            if (params.initialTasks && params.initialTasks.length > 0) {
                for (const t of params.initialTasks) {
                    const bucketId = bucketIds[t.bucketName];
                    if (!bucketId) continue;

                    const taskId = uuidv4();
                    
                    let progress: "Not Started" | "In Progress" | "On Hold" | "Completed" = "Not Started";
                    if (t.bucketName === "In Progress") {
                        progress = "In Progress";
                    } else if (t.bucketName === "Completed") {
                        progress = "Completed";
                    }

                    const showOnTask = t.steps && t.steps.length > 0 ? "steps" : "note";

                    await db.insert(tasks).values({
                        id: taskId,
                        project_id: projectId,
                        bucket_id: bucketId,
                        title: t.title,
                        progress,
                        note: t.note || null,
                        start_date: t.startDate || null,
                        end_date: t.endDate || null,
                        entitlementScore: t.entitlementScore,
                        showOnTask,
                        created_at: now,
                        updated_at: now,
                    });
                    tasksCreatedCount++;

                    // 4. If task has steps, loop and insert into 'steps' table
                    if (t.steps && t.steps.length > 0) {
                        for (let j = 0; j < t.steps.length; j++) {
                            const stepVal = t.steps[j];
                            await db.insert(steps).values({
                                id: uuidv4(),
                                task_id: taskId,
                                value: stepVal,
                                order: j,
                                checked: progress === "Completed"
                            });
                            stepsCreatedCount++;
                        }
                    }
                }
            }

            return {
                content: [{
                    type: "text",
                    text: `Successfully bootstrapped project workspace '${params.name}' (ID: ${projectId}) with ${params.buckets.length} boards, ${tasksCreatedCount} tasks, and ${stepsCreatedCount} sub-steps.`
                }]
            };
        } catch (error) {
            return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
        }
    }
);

// Tool to create a standalone task
server.registerTool(
    "create_task",
    {
        description: "Creates a single task within an existing project bucket.",
        inputSchema: z.object({
            projectId: z.string().uuid(),
            bucketId: z.string().uuid(),
            title: z.string(),
            note: z.string().max(1500).optional(),
            startDate: z.string().optional().describe("YYYY-MM-DD"),
            endDate: z.string().optional().describe("YYYY-MM-DD"),
            progress: z.enum(["Not Started", "In Progress", "On Hold", "Completed"]).default("Not Started"),
            entitlementScore: z.number().default(1),
            showOnTask: z.enum(["note", "steps"]).default("note")
        })
    },
    async (params) => {
        try {
            const taskId = uuidv4();
            const now = new Date();
            await db.insert(tasks).values({
                id: taskId,
                project_id: params.projectId,
                bucket_id: params.bucketId,
                title: params.title,
                note: params.note || null,
                start_date: params.startDate || null,
                end_date: params.endDate || null,
                progress: params.progress,
                entitlementScore: params.entitlementScore,
                showOnTask: params.showOnTask,
                created_at: now,
                updated_at: now
            });
            return { content: [{ type: "text", text: `Task '${params.title}' created successfully with ID: ${taskId}.` }] };
        } catch (error) {
            return { content: [{ type: "text", text: `Error creating task: ${error}` }], isError: true };
        }
    }
);

// ==========================================
// 2. READ TOOLS
// ==========================================

// Tool to fetch the entire board context for the LLM
server.registerTool(
    "get_project_board",
    {
        description: "Retrieves a comprehensive view of a project board including all buckets, tasks, and sub-steps.",
        inputSchema: z.object({
            projectId: z.string().uuid()
        })
    },
    async (params) => {
        try {
            const projectRecord = await db.select().from(projects).where(eq(projects.id, params.projectId)).limit(1);
            if (projectRecord.length === 0) {
                return { content: [{ type: "text", text: `Project board with ID ${params.projectId} not found.` }], isError: true };
            }

            const projectBuckets = await db.select().from(buckets).where(eq(buckets.project_id, params.projectId)).orderBy(buckets.order);
            const projectTasks = await db.query.tasks.findMany({
                where: eq(tasks.project_id, params.projectId),
                with: {
                    steps: true
                }
            });

            const board = {
                ...projectRecord[0],
                buckets: projectBuckets.map(b => ({
                    ...b,
                    tasks: projectTasks
                        .filter(t => t.bucket_id === b.id)
                        .map(t => ({
                            ...t,
                            steps: [...(t.steps || [])].sort((x, y) => x.order - y.order)
                        }))
                }))
            };

            return {
                content: [{ type: "text", text: JSON.stringify(board, null, 2) }]
            };
        } catch (error) {
            return { content: [{ type: "text", text: `Error reading board: ${error}` }], isError: true };
        }
    }
);

// ==========================================
// 3. UPDATE TOOLS
// ==========================================

// Tool to modify task tracking and location properties
server.registerTool(
    "update_task",
    {
        description: "Updates details of an existing task. Use this to move items between Kanban columns or update progress states.",
        inputSchema: z.object({
            taskId: z.string().uuid(),
            bucketId: z.string().uuid().optional().describe("Provide this to move the task to a different Kanban column."),
            title: z.string().optional(),
            progress: z.enum(["Not Started", "In Progress", "On Hold", "Completed"]).optional(),
            note: z.string().max(1500).optional(),
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            entitlementScore: z.number().optional()
        })
    },
    async (params) => {
        try {
            const updates: any = {};
            if (params.bucketId !== undefined) updates.bucket_id = params.bucketId;
            if (params.title !== undefined) updates.title = params.title;
            if (params.progress !== undefined) updates.progress = params.progress;
            if (params.note !== undefined) updates.note = params.note;
            if (params.startDate !== undefined) updates.start_date = params.startDate;
            if (params.endDate !== undefined) updates.end_date = params.endDate;
            if (params.entitlementScore !== undefined) updates.entitlementScore = params.entitlementScore;
            
            updates.updated_at = new Date();

            await db.update(tasks).set(updates).where(eq(tasks.id, params.taskId));
            return { content: [{ type: "text", text: `Task ${params.taskId} updated successfully.` }] };
        } catch (error) {
            return { content: [{ type: "text", text: `Error updating task: ${error}` }], isError: true };
        }
    }
);

// Tool to manage sub-task item states explicitly
server.registerTool(
    "modify_steps",
    {
        description: "Appends new checklist sub-steps to a task or toggles the completion check status of an existing sub-step.",
        inputSchema: z.object({
            taskId: z.string().uuid(),
            action: z.enum(["ADD", "TOGGLE", "DELETE"]),
            stepId: z.string().uuid().optional().describe("Required for TOGGLE or DELETE actions."),
            value: z.string().optional().describe("The text string content, required for ADD action."),
            checked: z.boolean().optional().describe("The checked state override.")
        })
    },
    async (params) => {
        try {
            if (params.action === "ADD") {
                if (!params.value) {
                    return { content: [{ type: "text", text: "Value is required for ADD action." }], isError: true };
                }
                
                // Get current max order
                const existingSteps = await db.select().from(steps).where(eq(steps.task_id, params.taskId));
                let maxOrder = -1;
                for (const s of existingSteps) {
                    if (s.order > maxOrder) {
                        maxOrder = s.order;
                    }
                }
                
                const stepId = uuidv4();
                await db.insert(steps).values({
                    id: stepId,
                    task_id: params.taskId,
                    value: params.value,
                    order: maxOrder + 1,
                    checked: false
                });
                
                return { content: [{ type: "text", text: `Added step successfully with ID: ${stepId}` }] };
            } else if (params.action === "TOGGLE") {
                if (!params.stepId) {
                    return { content: [{ type: "text", text: "Step ID is required for TOGGLE action." }], isError: true };
                }
                
                let targetChecked = params.checked;
                if (targetChecked === undefined) {
                    const stepRecord = await db.select().from(steps).where(eq(steps.id, params.stepId)).limit(1);
                    if (stepRecord.length > 0) {
                        targetChecked = !stepRecord[0].checked;
                    } else {
                        return { content: [{ type: "text", text: `Step with ID ${params.stepId} not found.` }], isError: true };
                    }
                }
                
                await db.update(steps).set({ checked: targetChecked }).where(eq(steps.id, params.stepId));
                return { content: [{ type: "text", text: `Toggled step ${params.stepId} to checked = ${targetChecked}.` }] };
            } else if (params.action === "DELETE") {
                if (!params.stepId) {
                    return { content: [{ type: "text", text: "Step ID is required for DELETE action." }], isError: true };
                }
                
                await db.delete(steps).where(eq(steps.id, params.stepId));
                return { content: [{ type: "text", text: `Deleted step ${params.stepId} successfully.` }] };
            }
            
            return { content: [{ type: "text", text: `Unknown action: ${params.action}` }], isError: true };
        } catch (error) {
            return { content: [{ type: "text", text: `Error modifying steps: ${error}` }], isError: true };
        }
    }
);

// ==========================================
// 4. DELETE TOOLS
// ==========================================

// Tool to delete tasks safely
server.registerTool(
    "delete_task",
    {
        description: "Permanently deletes a task from a project board.",
        inputSchema: z.object({
            taskId: z.string().uuid()
        })
    },
    async (params) => {
        try {
            await db.delete(tasks).where(eq(tasks.id, params.taskId));
            return { content: [{ type: "text", text: `Task ${params.taskId} deleted successfully.` }] };
        } catch (error) {
            return { content: [{ type: "text", text: `Error deleting task: ${error}` }], isError: true };
        }
    }
);

// Start the Server
async function start() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

start().catch((err) => {
    // Only log if an actual critical failure happens
    console.error(JSON.stringify({ error: "Server failed to start", details: err }));
});