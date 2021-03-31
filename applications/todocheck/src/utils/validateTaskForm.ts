import { Values, Errors } from "../components/TaskForm";
import validateTitle from "./validateTitle";
import validateStartDate from "./validateStartDate";

type Validator = (
  value: Values[keyof Values],
  allValues: Values
) => string | undefined;

const getValidatorByField = (field: keyof Values): Validator => {
  switch (field) {
    case "title":
      return validateTitle as Validator;
    case "startDate":
      return validateStartDate as Validator;
    default:
      return (value?: any) => undefined;
  }
};

const validateTaskForm = (values: Values): Errors => {
  return Object.entries(values).reduce((errors, [field, value]) => {
    const validate = getValidatorByField(field as keyof Values);

    return {
      ...errors,
      [field]: validate(value, values)
    };
  }, {});
};

export default validateTaskForm;
