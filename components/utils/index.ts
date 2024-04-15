import {
  PropsWithTeamI,
  PropsWithTeamMembersI,
  TeamI,
  TeamMemberI,
} from "@/interfaces";
import { PropsWithTaskI, TaskI } from "@/interfaces";

export const formatDate = (date: Date) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear().toString();
  const month = parsedDate.getMonth().toString();
  const day = parsedDate.getDate().toString();
  return `${year}-${month}-${day}`;
};

export const convertToTaskList = (
  data: PropsWithTaskI[] | undefined
) => {
  const newList: TaskI[] = [];

  if (!data) return newList;

  data.forEach((item) => {
    newList.push(item.tasks);
  });

  return newList;
};

export const convertToTeamList = (
  data: PropsWithTeamI[] | undefined
) => {
  const newList: TeamI[] = [];

  if (!data) return newList;

  data.forEach((item) => {
    newList.push(item.teams);
  });

  return newList;
};

export const convertToTeamMembersList = (
  data: PropsWithTeamMembersI[] | undefined
) => {
  const newList: TeamMemberI[] = [];

  if (!data) return newList;

  data.forEach((item) => {
    newList.push(item.team_members);
  });

  return newList;
};
