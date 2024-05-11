import { Feature } from "@/interfaces";
import { BsKanban } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

// Error messages

// Bucket
export const getBucketsError = {
  type: "GET BUCKETS",
  message: "Failed to retrieve buckets",
};

export const addBucketError = {
  type: "ADD BUCKET",
  message: "Failed to add bucket",
};

export const updateBucketError = {
  type: "UPDATE BUCKET",
  message: "Failed to update bucket",
};

export const deleteBucketError = {
  type: "DELETE BUCKET",
  message: "Failed to delete bucket",
};
////////////////////////////////////////////

// PROJECT
export const getProjectError = {
  type: "GET PROJECT",
  message: "Failed to retrieve project",
};

export const addProjectError = {
  type: "ADD PROJECT",
  message: "Failed to add project",
};

export const updateProjectError = {
  type: "UPDATE PROJECT",
  message: "Failed to update project",
};

export const deleteProjectError = {
  type: "DELETE PROJECT",
  message: "Failed to delete project",
};

////////////////////////////////////////////

// TASKS
export const getTasksError = {
  type: "GET TASKS",
  message: "Failed to retrieve tasks",
};

export const moveTaskError = {
  type: "Not enough buckets error",
  message: "You need more than 2 buckets",
};

export const addTaskError = {
  type: "ADD TASK",
  message: "Failed to add task",
};

export const updateTaskError = {
  type: "UPDATE TASK",
  message: "Failed to update task",
};

export const deleteTaskError = {
  type: "DELETE TASK",
  message: "Failed to delete task",
};

export const assignUserError = {
  type: "ASSIGN USER",
  message: "Failed to assign user",
};

export const unassignUserError = {
  type: "UNASSIGN USER",
  message: "Failed to unassign user",
};

////////////////////////////////////////////

// LABEL
export const getLabelsError = {
  type: "GET LABELS",
  message: "Failed to retrieve labels",
};

export const addLabelError = {
  type: "ADD LABEL",
  message: "Failed to add label",
};

export const updateLabelError = {
  type: "UPDATE LABEL",
  message: "Failed to update label",
};

export const deleteLabelError = {
  type: "DELETE LABEL",
  message: "Failed to delete label",
};

export const assignLabelError = {
  type: "ASSIGN LABEL",
  message: "Failed to assign label",
};

export const unassignLabelError = {
  type: "UNASSIGN LABEL",
  message: "Failed to unassign label",
};

////////////////////////////////////////////

// STEPS
export const getStepsError = {
  type: "GET STEPS",
  message: "Failed to retrieve steps",
};

export const addStepError = {
  type: "ADD STEP",
  message: "Failed to add step",
};

export const updateStepError = {
  type: "UPDATE STEP",
  message: "Failed to update step",
};

export const deleteStepError = {
  type: "DELETE STEP",
  message: "Failed to delete step",
};

////////////////////////////////////////////

// TEAMS
export const getTeamsError = {
  type: "GET TEAMS",
  message: "Failed to retrieve teams",
};

export const addTeamsError = {
  type: "ADD TEAMS",
  message: "Failed to add team",
};

export const updateTeamsError = {
  type: "UPDATE TEAMS",
  message: "Failed to update team",
};

export const deleteTeamError = {
  type: "DELETE TEAM",
  message: "Failed to delete team",
};

export const getTeamMembersError = {
  type: "GET TEAM MEMBERS",
  message: "Failed to retrieve team members",
};

export const addTeamMemberError = {
  type: "ADD TEAM MEMBER",
  message: "Failed to add Team Member",
};

export const removeTeamMemberError = {
  type: "REMOVE TEAM MEMBER",
  message: "Failed to remove Team Member",
};

export const updateTeamMemberRoleError = {
  type: "UPDATE ROLE",
  message: "Failed to update role",
};

export const getAssigneeError = {
  type: "GET ASSIGNEE",
  message: "Failed to retrieve assignee",
};

export const lastOwnerError = {
  type: "Last Owner Error",
  message: "Cannot change or remove last owner",
};
////////////////////////////////////////////

// Other ERRORS
export const unexpectedError = {
  type: "Unknown Error",
  message: "Unexpected error occured",
};

export const unAuthorizedError = {
  type: "Unauthorized Access Error",
  message: "You are not authorized to make any changes",
};

export const alreadyExists = (name: string) => ({
  type: "Already Exists Error",
  message: `${name} already exists`,
});

export const notFoundError = (name: string) => ({
  type: "Not Found Error",
  message: `${name} not found`,
});
//////////////////////////////////////////////////////////

// Static texts
export const taskSeverity = [
  "Low",
  "Medium",
  "High",
  "Urgent",
];

export const taskProgress = [
  "Not Started",
  "In Progress",
  "On Hold",
  "Completed",
];

export const groupTypes = [
  "Bucket",
  "Progress",
  "Severity",
  "Label",
];

export const listByTypes = ["Active", "Completed"];

export const tableHeaderRow = [
  { sortKey: null, label: "", width: "3%" },
  { sortKey: "title", label: "Task Name", width: "25%" },
  { sortKey: null, label: "Assigned To", width: "12%" },
  { sortKey: null, label: "Bucket", width: "15%" },
  { sortKey: "progress", label: "Progress", width: "15%" },
  { sortKey: "severity", label: "Severity", width: "15%" },
  { sortKey: "end_date", label: "Due", width: "10%" },
  { sortKey: null, label: "", width: "5%" },
];

export const panelItems = [
  {
    name: "Dashboard",
    icon: IoHomeOutline,
    href: "/",
  },
  {
    name: "Kanban View",
    icon: BsKanban,
    href: "/kanban",
  },
  {
    name: "List View",
    icon: FaRegListAlt,
    href: "/list",
  },
];

export const tabsList = [
  {
    name: "List",
  },
  {
    name: "Kanban",
  },
];

// Features PAGE

export const featureIntro =
  "Getting started with Time Boxing";

export const featureDesc =
  "Take control of your projects. Our powerful yet flexible system uses boards, lists, and cards for a crystal-clear view of everything. See exactly who's doing what and what needs to be done next – all at a glance.";

export const features: Feature[] = [
  {
    header: "Kanban View",
    body: "Gain complete control over your project. See all your tasks at a glance, with each card offering a detailed view so you can plan, manage, and track progress with ease.",
    linkText: "Learn More",
    link: "",
    image: "/images/kanban.webp",
    active: true,
  },
  {
    header: "List View",
    body: "Unify your project tasks in one view.  See them organized and prioritized for clear oversight. Click any card to unlock a deeper dive, revealing all the details you need to stay on top of every step.",
    linkText: "Learn More",
    link: "",
    image: "/images/list.webp",
    active: false,
  },
  {
    header: "Card Details",
    body: "Get a clear picture of your workflow with each task displayed on a card. Click any card to dive deeper and see all the details you need",
    linkText: "Learn More",
    link: "",
    image: "/images/task-details.webp",
    active: false,
  },
];

// Reviews

export const reviewSectionTitle =
  "The Timeboxing Experience";

export const reviews = [
  {
    name: "Harsh Shah",
    title: "Project Manager",
    desc: "Timeboxing has been a game-changer for my team! We used to struggle with staying focused and on deadline. With Timeboxing, we can easily break down projects into manageable chunks and track our progress. It's also great for keeping everyone on the same page and collaborating effectively",
  },
  {
    name: "Dharma Singh",
    title: "Software Engineer",
    desc: "As a developer, I love the visual interface of Timeboxing. It makes it easy to see the big picture of a project and how each task fits together. The time tracking features are also really helpful for staying accountable and identifying areas where I can improve my efficiency.",
  },
  {
    name: "Monika Patel",
    title: "Marketing Manager",
    desc: "As a developer, I love the visual interface of Timeboxing. It makes it easy to see the big picture of a project and how each task fits together. The time tracking features are also really helpful for staying accountable and identifying areas where I can improve my efficiency.",
  },
  {
    name: "Asha Anant",
    title: "Freelancer",
    desc: "As a freelance writer, staying focused and on deadline can be a constant struggle. I used to get overwhelmed by to-do lists and struggle to prioritize tasks. Timeboxing has completely changed that! Now, I can break down my writing projects into manageable chunks with clear timeframes. This keeps me focused and motivated throughout the day.",
  },
];
