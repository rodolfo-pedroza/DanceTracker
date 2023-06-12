import { differenceInYears } from "date-fns";

export const calculateAge = (selectedDate) => {
  if (selectedDate) {
    const currentDate = new Date();
    return differenceInYears(currentDate, selectedDate);
  }
  return null;
};
