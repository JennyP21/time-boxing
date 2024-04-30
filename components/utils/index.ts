import {
  CustomMembersI,
  GetTeamMembersI,
  TaskContainerI,
  TeamContainerI,
  ZErr,
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
