export const formatDate = (date: Date) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear().toString();
  const month = parsedDate.getMonth().toString();
  const day = parsedDate.getDate().toString();
  return `${year}-${month}-${day}`;
};
