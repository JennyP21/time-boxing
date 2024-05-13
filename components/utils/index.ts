import {
  CustomMembersI,
  GetTeamMembersI,
  TaskByProgressCount,
  TaskBySeverityCount,
  TaskContainerI,
  TaskI,
  TeamContainerI,
  ZErr,
} from "@/interfaces";
import bcrypt from "bcryptjs";

export const formatDate = (date: Date) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear().toString();
  const month = parsedDate.getMonth().toString();
  const day = parsedDate.getDate().toString();
  return `${year}-${month}-${day}`;
};

export const convertToTaskList = (
  data: TaskContainerI[] | undefined
) => {
  if (!data) return [];
  return data.map((item) => item.tasks);
};

export const convertToTeamList = (
  data: TeamContainerI[] | undefined
) => {
  if (!data) return [];
  return data.map((item) => item.teams);
};

export const convertToCustomMembersList = (
  data: GetTeamMembersI[] | undefined
) => {
  const newList: CustomMembersI[] = [];

  if (!data) return newList;

  data.forEach((item) => {
    const newData = {
      team_member_id: item.team_members.id,
      team_id: item.team_members.team_id,
      user_id: item.users.id,
      name: item.users.name,
      email: item.users.email,
      image: item.users.image,
      role: item.team_members.role,
    };
    newList.push(newData);
  });

  return newList;
};

export function parseZodErr(error: ZErr) {
  return error.issues[0].message;
}

export const verifyMember = (
  email: string,
  members: any
): boolean => {
  let isOwner = false;
  let isMember = false;

  members.forEach((member: any) => {
    if (member.users.email === email) {
      isMember = true;
      if (member.team_members.role === "owner")
        isOwner = true;
    }
  });

  return isMember && isOwner;
};

export const isMember = (newUser: any, members: any) => {
  return members.some(
    (member: any) => newUser.email === member.users.email
  );
};

export const adjustDates = (
  start_date: string,
  end_date: string,
  shift: "start" | "end"
) => {
  let start = new Date(start_date);
  let end = new Date(end_date);

  if (start > end) {
    const startDate = formatDate(start);
    const endDate = formatDate(end);
    return shift === "start"
      ? [startDate, startDate]
      : [endDate, endDate];
  }

  return [start_date, end_date];
};

export const groupBySeverityCount = (tasks: TaskI[]) => {
  let taskBySeverity: TaskBySeverityCount[] = [
    {
      severity: "Low",
      taskCount: 0,
    },
    {
      severity: "Medium",
      taskCount: 0,
    },
    {
      severity: "High",
      taskCount: 0,
    },
    {
      severity: "Urgent",
      taskCount: 0,
    },
  ];

  for (const task of tasks) {
    if (task.severity === "Low") {
      taskBySeverity[0].taskCount++;
    } else if (task.severity === "Medium") {
      taskBySeverity[1].taskCount++;
    } else if (task.severity === "High") {
      taskBySeverity[2].taskCount++;
    } else {
      taskBySeverity[3].taskCount++;
    }
  }

  return taskBySeverity;
};

export const groupByProgressCount = (tasks: TaskI[]) => {
  let taskByProgress: TaskByProgressCount[] = [
    {
      progress: "Not Started",
      taskCount: 0,
    },
    {
      progress: "In Progress",
      taskCount: 0,
    },
    {
      progress: "On Hold",
      taskCount: 0,
    },
    {
      progress: "Completed",
      taskCount: 0,
    },
  ];

  for (const task of tasks) {
    if (task.progress === "Not Started") {
      taskByProgress[0].taskCount++;
    } else if (task.progress === "In Progress") {
      taskByProgress[1].taskCount++;
    } else if (task.progress === "On Hold") {
      taskByProgress[2].taskCount++;
    } else {
      taskByProgress[3].taskCount++;
    }
  }

  return taskByProgress;
};

export const getTopUpcomingTasks = (tasks: TaskI[]) => {
  const filteredTasks = tasks.filter(
    (task) =>
      task.end_date && new Date(task.end_date) > new Date()
  );
  filteredTasks.sort((a, b) => {
    const dateA = new Date(a.end_date);
    const dateB = new Date(b.end_date);
    return dateA.getTime() - dateB.getTime();
  });

  return filteredTasks.slice(0, 5);
};

export const getLateTasks = (tasks: TaskI[]) => {
  const filteredTasks = tasks.filter(
    (task) =>
      task.end_date && new Date(task.end_date) < new Date()
  );
  filteredTasks.sort((a, b) => {
    const dateA = new Date(a.end_date);
    const dateB = new Date(b.end_date);
    return dateA.getTime() - dateB.getTime();
  });

  return filteredTasks.slice(0, 5);
};

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export function getImageUrlByName(name: string) {
  const letter = name[0].toLowerCase();
  return `/profile-icons/${letter}.png`;
}
