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
