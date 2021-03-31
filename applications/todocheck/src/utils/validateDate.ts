import { isValid } from "date-fns";

const validateDate = (date: string): string | undefined => {
  if (!isValid(new Date(date))) {
    return "Please check your date format.";
  }
};

export default validateDate;
