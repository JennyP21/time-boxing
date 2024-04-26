import { BsKanban } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

// Error messages

// 1) Bucket

export const addBucketError = {
  type: "Add Bucket Error",
  message: "Unable to add bucket.",
};

export const updateBucketError = {
  type: "Update Bucket Error",
  message: "Unable to update bucket.",
};

export const deleteBucketError = {
  type: "Delete Bucket Error",
  message: "Unable to delete bucket.",
};

export const moveTaskError = {
  type: "Not enough buckets error",
  message: "You need more than 2 buckets",
};

export const unAuthorizedError = {
  type: "Unauthorized Access Error",
  message: "You are not authorized to make any changes",
};

export const lastOwnerError = {
  type: "Last Owner Error",
  message: "Cannot change or remove last owner",
};

export const alreadyExists = (name: string) => ({
  type: "Already Exists Error",
  message: `${name} Already Exists`,
});

export const notFoundError = (name: string) => ({
  type: "Not Found Error",
  message: `${name} Not found`,
});

export const unexpectedError = {
  type: "Unknown Error",
  message: "Unexpected error occured",
};

export const getProjectError = {
  type: "GET PROJECT",
  message: "Failed to retrieve project",
};

export const getTasksError = {
  type: "GET TASKS",
  message: "Failed to retrieve tasks",
};

export const getBucketsError = {
  type: "GET BUCKETS",
  message: "Failed to retrieve buckets",
};

export const getLabelsError = {
  type: "GET LABELS",
  message: "Failed to retrieve labels",
};

export const getStepsError = {
  type: "GET STEPS",
  message: "Failed to retrieve steps",
};

export const getAssigneeError = {
  type: "GET ASSIGNEE",
  message: "Failed to retrieve assignee",
};

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
    active: true,
  },
  {
    name: "Kanban",
    active: false,
  },
];
