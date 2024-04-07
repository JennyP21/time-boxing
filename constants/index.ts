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

export const tableHeaderRow = [
  { label: "Task Name", width: "35%" },
  { label: "Assigned To", width: "20%" },
  { label: "Progress", width: "10%" },
  { label: "Severity", width: "10%" },
  { label: "Due", width: "10%" },
  { label: "Bucket", width: "15%" },
];
