export const formatDate = (value: string): string => {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
};

export const formatDateToField = (value: string): string => {
  const [day, month, year] = value.split(".");
  return `${year}-${month}-${day}`;
};
