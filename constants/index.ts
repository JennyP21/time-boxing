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

export const getStepsError = {
  type: "Get Steps Error",
  message: "Unable to get steps",
};

export const moveTaskError = {
  type: "Not enough buckets error",
  message: "You need more than 2 buckets",
};

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
