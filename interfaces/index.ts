export interface ProjectI {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface BucketI {
  id: string;
  name: string;
  order: number;
  project_id: string;
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
  created_at: Date;
  updated_at: Date;
}

export interface StepsI {
  id: string;
  task_id: string;
  value: string;
  order: number;
  checked: boolean;
}

export interface UserI {
  id: string;
  image: string;
  name: string;
  email: string;
}

export interface TaskWithUserI {
  task: TaskI;
  user: UserI;
}

export interface TaskAttributesProps {
  task_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  severity: string;
  progress: string;
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

export interface TabI {
  name: string;
  active: boolean;
}

export interface PropsWithProject {
  project: ProjectI;
}
