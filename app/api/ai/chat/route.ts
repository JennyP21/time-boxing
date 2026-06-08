import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/apiAuth";
import { db } from "@/drizzle";
import { projects, buckets, tasks, steps, team_members } from "@/drizzle/schema";
import { eq, inArray, or } from "drizzle-orm";
import { spawn } from "child_process";
import path from "path";

function cleanJsonResponse(text: string): string {
    let cleaned = text.trim();
    if (cleaned.startsWith("```json")) {
        cleaned = cleaned.substring("```json".length);
    } else if (cleaned.startsWith("```")) {
        cleaned = cleaned.substring("```".length);
    }
    if (cleaned.endsWith("```")) {
        cleaned = cleaned.substring(0, cleaned.length - "```".length);
    }
    return cleaned.trim();
}

// MCP communication helper
async function callMcpServer(toolName: string, toolArgs: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const serverPath = path.resolve(process.cwd(), "ai/mcpServer.ts");
        const child = spawn("node", ["-r", "esbuild-register", serverPath], {
            cwd: process.cwd(),
            env: { ...process.env }
        });

        let stdout = "";
        let stderr = "";
        let stage = "init"; // 'init', 'call', 'done'

        const cleanUp = () => {
            child.kill("SIGKILL");
        };

        // Timeout fallback after 10 seconds
        const timeout = setTimeout(() => {
            cleanUp();
            reject(new Error("MCP Server request timed out after 10 seconds."));
        }, 10000);

        child.stdout.on("data", (data) => {
            stdout += data.toString();
            processBuffer();
        });

        child.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        child.on("error", (err) => {
            clearTimeout(timeout);
            cleanUp();
            reject(err);
        });

        child.on("close", (code) => {
            clearTimeout(timeout);
            if (stage !== "done") {
                reject(new Error(`MCP Server closed early with code ${code}. Stderr: ${stderr}`));
            }
        });

        const sendMessage = (msg: any) => {
            child.stdin.write(JSON.stringify(msg) + "\n");
        };

        // Step 1: Send initialize request
        sendMessage({
            jsonrpc: "2.0",
            method: "initialize",
            params: {
                protocolVersion: "2024-11-05",
                capabilities: {},
                clientInfo: { name: "time-boxing-client", version: "1.0.0" }
            },
            id: 1
        });

        const processBuffer = () => {
            const lines = stdout.split("\n");
            stdout = lines.pop() || "";

            for (const line of lines) {
                if (!line.trim()) continue;
                try {
                    const msg = JSON.parse(line.trim());
                    if (msg.id === 1 && stage === "init") {
                        // Received initialize response, notify server
                        sendMessage({
                            jsonrpc: "2.0",
                            method: "notifications/initialized"
                        });
                        // Send actual tool call
                        stage = "call";
                        sendMessage({
                            jsonrpc: "2.0",
                            method: "tools/call",
                            params: {
                                name: toolName,
                                arguments: toolArgs
                            },
                            id: 2
                        });
                    } else if (msg.id === 2 && stage === "call") {
                        // Received tools/call response
                        stage = "done";
                        clearTimeout(timeout);
                        cleanUp();
                        resolve(msg.result);
                    }
                } catch (e) {
                    // Ignore JSON parsing errors for partial/malformed lines
                }
            }
        };
    });
}

function getFriendlyErrorMessage(error: any): string {
    const message = (error?.message || String(error)).toLowerCase();

    if (message.includes("429") || message.includes("too many requests") || message.includes("resource_exhausted") || message.includes("quota")) {
        return "The assistant is currently receiving too many requests. Please wait a moment before trying again, or use one of the offline commands (like 'list projects' or 'create project [Name]').";
    }

    if (message.includes("unauthorized") || message.includes("signin") || message.includes("sign in")) {
        return "Please sign in to your account first so I can assist you with your project boards.";
    }

    if (message.includes("api error") || message.includes("google") || message.includes("generativelanguage") || message.includes("fetch")) {
        return "I'm having trouble connecting to the AI helper service. Please try again in a moment.";
    }

    if (message.includes("timeout") || message.includes("timed out")) {
        return "The request took too long to respond. Please try again.";
    }

    return "Something went wrong on our end while processing your request. Please try again in a moment.";
}

export async function POST(req: NextRequest) {
    try {
        const sessionUser = await verifySession();
        if (!sessionUser) {
            return NextResponse.json({ reply: "Please sign in to your account first so I can assist you with your project boards." }, { status: 401 });
        }
        const userId = sessionUser.id;

        const { message } = await req.json();
        if (!message) {
            return NextResponse.json({ reply: "It looks like your message is empty. Please type something for me to help you!" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        // Fetch user context (both personal and team projects) for natural language mapping
        const myTeamMemberships = await db.select().from(team_members).where(eq(team_members.user_id, userId));
        const teamIds = myTeamMemberships.map(tm => tm.team_id).filter(id => id !== null) as string[];

        let accessibleProjects = [];
        if (teamIds.length > 0) {
            accessibleProjects = await db.select().from(projects).where(
                or(
                    eq(projects.user_id, userId),
                    inArray(projects.team_id, teamIds)
                )
            );
        } else {
            accessibleProjects = await db.select().from(projects).where(eq(projects.user_id, userId));
        }

        const projectIds = accessibleProjects.map(p => p.id);

        let dbCtx: any[] = [];
        if (projectIds.length > 0) {
            const userBuckets = await db.select().from(buckets).where(inArray(buckets.project_id, projectIds));
            const userTasks = await db.query.tasks.findMany({
                where: inArray(tasks.project_id, projectIds),
                with: {
                    steps: true
                }
            });

            dbCtx = accessibleProjects.map(p => ({
                projectId: p.id,
                projectName: p.name,
                projectType: p.team_id ? "team" : "personal",
                teamId: p.team_id || null,
                buckets: userBuckets
                    .filter(b => b.project_id === p.id)
                    .map(b => ({
                        bucketId: b.id,
                        bucketName: b.name,
                        tasks: userTasks
                            .filter(t => t.bucket_id === b.id)
                            .map(t => ({
                                taskId: t.id,
                                taskTitle: t.title,
                                progress: t.progress,
                                steps: (t.steps || []).map(s => ({ stepId: s.id, stepValue: s.value, checked: s.checked }))
                            }))
                    }))
            }));
        }

        if (apiKey) {
            // Call Gemini to map intent to MCP tools
            const prompt = `
You are an AI assistant for a Time-Boxing Kanban board application.
The logged-in user ID is: "${userId}".

The user wants to manage their projects, tasks, and steps using natural language.
You have access to the following MCP tools:
1. "create_project_workspace"
   Arguments:
   - "name": (string, required)
   - "userId": (string, required - use "${userId}")
   - "teamId": (string, optional)
   - "buckets": (array of strings, optional, defaults to ["To Do", "In Progress", "Completed"])
   - "initialTasks": (array of task objects, optional)
     Each task has:
     - "title": (string, required)
     - "bucketName": (string, required - must match one of the buckets)
     - "note": (string, optional)
     - "startDate": (string, optional, YYYY-MM-DD)
     - "endDate": (string, optional, YYYY-MM-DD)
     - "entitlementScore": (number, optional)
     - "steps": (array of strings, optional)

2. "create_task"
   Arguments:
   - "projectId": (string, uuid, required)
   - "bucketId": (string, uuid, required)
   - "title": (string, required)
   - "note": (string, optional)
   - "startDate": (string, optional, YYYY-MM-DD)
   - "endDate": (string, optional, YYYY-MM-DD)
   - "progress": (string, optional: "Not Started" | "In Progress" | "On Hold" | "Completed")
   - "entitlementScore": (number, optional)
   - "showOnTask": (string, optional: "note" | "steps")

3. "get_project_board"
   Arguments:
   - "projectId": (string, uuid, required)

4. "update_task"
   Arguments:
   - "taskId": (string, uuid, required)
   - "bucketId": (string, uuid, optional)
   - "title": (string, optional)
   - "progress": (string, optional)
   - "note": (string, optional)
   - "startDate": (string, optional)
   - "endDate": (string, optional)
   - "entitlementScore": (number, optional)

5. "modify_steps"
   Arguments:
   - "taskId": (string, uuid, required)
   - "action": (string, required: "ADD" | "TOGGLE" | "DELETE")
   - "stepId": (string, uuid, optional, required for TOGGLE or DELETE)
   - "value": (string, optional, required for ADD)
   - "checked": (boolean, optional)

6. "delete_task"
   Arguments:
   - "taskId": (string, uuid, required)

Database context of the user:
${JSON.stringify(dbCtx, null, 2)}

User request: "${message}"

You must respond with a JSON object in this exact schema:
{
  "calls": [
    {
      "tool": "tool_name",
      "arguments": { ... }
    }
  ],
  "explanation": "Natural language conversational response to user, explaining what you did or answering their question."
}
If no tools need to be called, set "calls" to an empty array [].
`;

            const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: "application/json" }
                })
            });

            if (!geminiRes.ok) {
                throw new Error(`Gemini API error: ${geminiRes.statusText}`);
            }

            const geminiData = await geminiRes.json();
            const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!responseText) {
                throw new Error("Empty response from Gemini API.");
            }

            const cleanedText = cleanJsonResponse(responseText);
            const parsed = JSON.parse(cleanedText);

            const explanation = parsed.explanation || parsed.message || parsed.reply || "Request processed successfully.";

            if (parsed.calls && parsed.calls.length > 0) {
                let hasFailures = false;
                for (const call of parsed.calls) {
                    try {
                        await callMcpServer(call.tool, call.arguments);
                    } catch (err: any) {
                        console.error(`Action ${call.tool} failed:`, err);
                        hasFailures = true;
                    }
                }

                let replyText = explanation;
                if (hasFailures) {
                    replyText += "\n\n*(Note: Some updates could not be applied. Please check the project board to confirm changes.)*";
                }
                return NextResponse.json({ reply: replyText });
            } else {
                return NextResponse.json({ reply: explanation });
            }
        } else {
            // Regex Fallbacks (Local command processing if no API Key provided)
            const text = message.toLowerCase().trim();

            if (text.startsWith("create project ")) {
                const projName = message.substring("create project ".length).trim();
                try {
                    await callMcpServer("create_project_workspace", { name: projName, userId });
                    return NextResponse.json({
                        reply: `I've successfully created your new project board: "${projName}". You can now start adding tasks to it!`
                    });
                } catch (err) {
                    return NextResponse.json({
                        reply: "I couldn't create the project board right now. Please try again."
                    });
                }
            }

            if (text.includes("list my team projects") || text.includes("show team projects") || text.includes("list team projects")) {
                const list = accessibleProjects.filter(p => p.team_id).map(p => `- ${p.name}`).join("\n");
                return NextResponse.json({
                    reply: list
                        ? `Here are your team projects:\n${list}`
                        : "You don't have any team projects set up yet."
                });
            }

            if (text.includes("list my projects") || text.includes("show projects") || text.includes("list projects")) {
                const list = accessibleProjects.map(p => {
                    const typeStr = p.team_id ? "[Team]" : "[Personal]";
                    return `- ${typeStr} ${p.name}`;
                }).join("\n");
                return NextResponse.json({
                    reply: list
                        ? `Here are your current projects:\n${list}`
                        : "You don't have any projects created yet."
                });
            }

            return NextResponse.json({
                reply: `I received your request: "${message}".\n\nI'm currently running in offline mode. You can use these simple commands:\n- "create project [Name]"\n- "list projects"\n- "list team projects"`
            });
        }
    } catch (error: any) {
        console.error("Error in AI Chat Route:", error);
        return NextResponse.json({ reply: getFriendlyErrorMessage(error) });
    }
}
