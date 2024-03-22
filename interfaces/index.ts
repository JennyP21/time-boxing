export interface Bucket {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: string;
  user_id: string;
  bucket_id: string;
  title: string;
  start_date: string;
  end_date: string;
  severity: "low" | "medium" | "high" | "urgent";
  progress:
    | "Not Started"
    | "In Progress"
    | "On Hold"
    | "Completed";
  steps: string[];
  created_at: Date;
  updated_at: Date;
}
