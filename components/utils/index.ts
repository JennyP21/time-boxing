import {
  CustomMembers,
  TaskContainerI,
  TeamContainerI,
  GetTeamMembersI,
  TaskI,
  TeamI,
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
  const newList: TaskI[] = [];

  if (!data) return newList;

  data.forEach((item) => {
    newList.push(item.tasks);
  });

  return newList;
};

export const convertToTeamList = (
  data: TeamContainerI[] | undefined
) => {
  const newList: TeamI[] = [];

  if (!data) return newList;

  data.forEach((item) => {
    newList.push(item.teams);
  });

  return newList;
};

export const convertToCustomMembersList = (
  data: GetTeamMembersI[] | undefined
) => {
  const newList: CustomMembers[] = [];

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
