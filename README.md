# Time Boxing - Task Management Application

Time Boxing is a modern, collaborative Kanban-style task management application designed to help individuals and teams organize their workflows. By integrating flexible task attributes, drag-and-drop boards, team management, and a context-aware AI assistant powered by the Model Context Protocol (MCP), Time Boxing makes task management fluid, visual, and highly efficient.

---

## 🚀 Key Features

- **Draggable Kanban Boards**: Organize tasks visually across custom columns (buckets) like "To Do", "In Progress", and "Completed" using `@hello-pangea/dnd` for fluid drag-and-drop interactions.
- **Rich Task Attributes**:
  - **Start & Due Dates**: Track deadlines and schedule timelines.
  - **Progress Status**: Set progress states (`Not Started`, `In Progress`, `On Hold`, `Completed`).
  - **Sub-step Checklists**: Break down larger tasks into smaller, checkable sub-steps.
  - **Effort/Priority Scores**: Apply entitlement scores to quantify task complexity or priority.
  - **Categorization**: Create and assign custom color-coded labels to tasks.
- **Personal & Team Workspaces**:
  - Manage private personal tasks.
  - Create teams, invite members, assign roles (`owner`, `member`), and collaborate on team project boards.
  - Assign specific team members to tasks for accountability.
- **AI Chat Assistant (MCP Powered)**:
  - An interactive AI Chat Drawer allows managing the project boards using natural language.
  - Powered by Gemini 2.5 Flash, the assistant interprets user intentions and maps them to database operations.
  - Standardized tool integration via a built-in **Model Context Protocol (MCP)** server.
  - Full offline fallback that supports matching simple commands (like `create project`, `list projects`) without requiring API keys.
- **Secure Authentication**:
  - Handled via NextAuth.js with support for credentials (email/password) and Google OAuth login.
  - Persistent sessions stored securely in PostgreSQL using Drizzle Adapter.

---

## 🏗️ Architecture

The application is built using a modern full-stack TypeScript architecture:

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, React 18, Chakra UI (for components), Tailwind CSS (for layout utilities), and Framer Motion (for animations).
- **State Management**: Redux Toolkit & RTK Query for client-side state, API caching, and background sync.
- **Database & ORM**: PostgreSQL, Drizzle ORM, and Drizzle Kit for database operations and migration management.
- **AI Integration**: Gemini 2.5 Flash REST API + custom MCP Server.
- **Authentication**: NextAuth.js with Google Provider and Credentials Provider.

### System Diagram

```mermaid
graph TD
    %% Styling
    classDef client fill:#3182ce,stroke:#2b6cb0,color:#fff;
    classDef server fill:#319795,stroke:#2c7a7b,color:#fff;
    classDef db fill:#dd6b20,stroke:#c05621,color:#fff;
    classDef ai fill:#805ad5,stroke:#6b46c1,color:#fff;

    %% Nodes
    User([User UI])
    ReactApp[Next.js Client React/Chakra UI/Tailwind]:::client
    ReduxStore[Redux Toolkit / RTK Query]:::client
    NextAuth[NextAuth.js Middleware]:::server
    APIRoutes[Next.js API Routes /api/*]:::server
    MCPChild[MCP Server Subprocess ai/mcpServer.ts]:::ai
    GeminiAPI[Gemini 2.5 Flash API]:::ai
    Drizzle[Drizzle ORM]:::server
    PostgreSQL[(PostgreSQL Database)]:::db

    %% Relationships
    User -->|Interacts| ReactApp
    ReactApp -->|Dispatches Actions| ReduxStore
    ReduxStore -->|API Requests| NextAuth
    NextAuth -->|Authorizes & Forwards| APIRoutes
    APIRoutes -->|Database queries| Drizzle
    Drizzle -->|Read/Write| PostgreSQL
    
    %% AI Chat specific flow
    ReactApp -->|AI Chat Input| APIRoutes
    APIRoutes -->|1. Natural Language Message| GeminiAPI
    GeminiAPI -->|2. Returns Tool Call JSON| APIRoutes
    APIRoutes -->|3. Spawns with stdin/stdout| MCPChild
    MCPChild -->|4. Runs db queries| Drizzle
    MCPChild -->|5. Tool results| APIRoutes
    APIRoutes -->|6. Unified Chat Response| ReactApp
```

### AI & Model Context Protocol (MCP) Server Integration
1. The built-in **MCP Server** (`ai/mcpServer.ts`) runs on Node.js using `@modelcontextprotocol/sdk`. It registers structured tools (`create_project_workspace`, `create_task`, `get_project_board`, `update_task`, `modify_steps`, `delete_task`) and interacts directly with PostgreSQL through Drizzle ORM.
2. The Next.js chat route (`/api/ai/chat`) verifies the user's session, pulls the context of projects accessible to that user, and constructs a detailed system prompt for the **Gemini 2.5 Flash** model.
3. If Gemini identifies an intent to modify or retrieve board state, it returns a JSON response specifying which MCP tools to invoke.
4. The Next.js server spawns the local MCP server as a subprocess, sends the JSON-RPC tool calls, awaits completion, and returns the AI's natural language explanation to the client.

---

## 🛠️ Local Setup & Installation

Follow these steps to set up and run the application on your local machine:

### Prerequisites
- Node.js (v18.x or later)
- npm or yarn
- A PostgreSQL database instance

### 1. Clone & Install Dependencies
Navigate to your project folder and run:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to a new file named `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in the values:
- **Database Settings**:
  - `DB_HOST`: Host of your PostgreSQL server (e.g., `localhost`)
  - `DB_USER`: Database user
  - `DB_PASSWORD`: Database password
  - `DB_NAME`: Database name
  - `DB_URL`: Postgres connection URL (e.g., `postgresql://user:password@localhost:5432/db_name`)
- **Authentication (NextAuth)**:
  - `NEXTAUTH_URL`: URL of the app in development (e.g., `http://localhost:3000`)
  - `NEXTAUTH_SECRET`: A secret string used to sign NextAuth tokens
- **Google OAuth (Optional, for Google Sign-In)**:
  - `GOOGLE_CLIENT_ID`: Your Google Developer Client ID
  - `GOOGLE_CLIENT_SECRET`: Your Google Developer Client Secret
- **AI Integration (Optional, for Gemini Chat)**:
  - `GEMINI_API_KEY`: Google Gemini API Key. (If omitted, the chat drawer runs in offline mode using basic command triggers)
- **Vercel Blob Storage (Optional, for profile/avatar upload)**:
  - `BLOB_STORE_ID`: Your Vercel Blob store identifier
  - `BLOB_READ_WRITE_TOKEN`: Token for writing to the Blob storage

### 3. Database Setup & Migrations
Use Drizzle Kit to generate and apply migrations to your PostgreSQL database:

```bash
# Generate the SQL migrations from drizzle/schema.ts
npm run db:generate

# Execute the migrations to configure your database tables
npm run db:migrate
```

### 4. Running the Development Server
Start the Next.js application in development mode:
```bash
npm run dev
```

The app will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
├── ai/
│   └── mcpServer.ts        # Built-in Model Context Protocol server
├── app/
│   ├── (auth)/             # Authentication route components
│   ├── (content)/          # Main dashboard, project, and team pages
│   ├── api/                # Next.js API endpoints (ai, project, task, team, etc.)
│   ├── layout.tsx          # Root layout with Chakra & Redux providers
│   └── page.tsx            # Landing/Home page
├── components/
│   ├── ui/                 # Reusable layout and custom components (Kanban, List, TaskDetails, AI Chat)
│   └── utils/              # Helper utilities
├── drizzle/
│   ├── migrations/         # Generated SQL migrations
│   ├── migrate.ts          # Database migration runner script
│   └── schema.ts           # PostgreSQL schema definitions
├── lib/
│   ├── features/           # Redux slices and RTK Query hooks
│   ├── apiAuth.ts          # API authentication helpers
│   └── store.ts            # Redux store config
└── drizzle.config.ts       # Drizzle Kit migration configuration
```
