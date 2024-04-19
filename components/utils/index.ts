import {
  CustomMembersI,
  GetTeamMembersI,
  TaskContainerI,
  TeamContainerI,
} from "@/interfaces";

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
