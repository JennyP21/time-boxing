import { IconType } from "react-icons/lib";
import { ZodIssue } from "zod";

export interface TeamI {
  id: string;
  name: string;
  desc: string;
  created_at: Date;
  updated_at: Date;
}

export interface TeamContainerI {
  teams: TeamI;
}

export interface TeamMemberI {
  id: string;
  team_id: string;
  user_id: string;
  role: "owner" | "member";
  created_at: Date;
}

export interface AddMemberI {
  team_id: string;
  user_email: string;
  role: "owner" | "member";
}

export interface RemoveMemberI {
  team_id: string;
  user_id: string;
}

export interface TeamMemberResponseI {
  team_members: TeamMemberI;
  users: UserI;
}

export interface TransformedTeamMemberResponseI {
  users: UserI[];
  team_members: TeamMemberI[];
}

export interface CustomMembersI {
  team_member_id: string;
  team_id: string;
  user_id: string;
  name: string;
  email: string;
  image: string;
  role: "owner" | "member";
}

export interface ProjectI {
  id: string;
  name: string;
  user_id: string | null;
  team_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectContainerI {
  project: ProjectI;
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
  project_id: string;
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

export interface TaskContainerI {
  tasks: TaskI;
}

export interface TaskBySeverityCount {
  severity: "Low" | "Medium" | "High" | "Urgent";
  taskCount: number;
}

export interface TaskByProgressCount {
  progress:
    | "Not Started"
    | "In Progress"
    | "On Hold"
    | "Completed";
  taskCount: number;
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
  name: string;
  email: string;
  password: string;
  image: string;
  imageData?: File;
}

export interface TaskAttributesProps {
  task_id: string;
  start_date: string;
  end_date: string;
  severity: string;
  progress: string;
}

export interface LabelI {
  id: string;
  name: string;
  project_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Task_LabelI {
  id: string;
  task_id: string;
  label_id: string;
}

export interface Task_AssigneeI {
  id: string;
  task_id: string;
  user_id: string;
}

export interface TabI {
  name: string;
  icon: IconType;
}

export interface APIParams {
  params: {
    id?: string;
    user_id?: string;
    project_id?: string;
    member_id?: string;
  };
}

export interface ZErr {
  issues: ZodIssue[];
  name: string;
}

export interface Feature {
  header: string;
  body: string;
  linkText: string;
  link: string;
  image: string;
  active: boolean;
}

export interface Plan {
  planName: string;
  planPrice: string;
  planDesc: string;
  planBtn: string;
  planBtnLink: string;
}

export type Pricing = "Monthly" | "Yearly";

export interface FooterLinkI {
  link: string;
  linkValue: string;
  icon: IconType;
}

export type ViewType = "List" | "Grid";
