export interface BucketI {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface TaskI {
  id: string;
  user_id: string;
  bucket_id: string;
  title: string;
  start_date: string;
  end_date: string;
  severity: "Low" | "Medium" | "High" | "Urgent";
  progress:
    | "Not Started"
    | "In Progress"
    | "On Hold"
    | "Completed";
  note: string;
  showOnTask: "note" | "steps";
  steps: string[];
  created_at: Date;
  updated_at: Date;
}

export interface UserI {
  id: string;
  image: string;
  name: string;
  email: string;
}

export interface TaskWithUserI {
  tasks: TaskI;
  user: UserI;
}

export interface LabelI {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Task_LabelI {
  id: string;
  task_id: string;
  label_id: string;
}
