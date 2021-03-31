import validateDate from "./validateDate";

const validateStartDate = (startDate: string): string | undefined => {
  if (!startDate) {
    return;
  }

  const basicDateValidation = validateDate(startDate);

  if (basicDateValidation) {
    return basicDateValidation;
  }
};

export default validateStartDate;
