import { useState } from 'react';

export const useForm = <TValues extends object>(
  initialValues: TValues,
  handleSubmit: (values: TValues) => void,
) => {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  const setValue = (field: string, value: any) => {
    setValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const setError = (field: string, message: string) => {
    setErrors(prevValues => ({
      ...prevValues,
      [field]: message,
    }));
  };

  const onChange = (
    event: React.ChangeEvent<{
      name: string;
      value: string;
    }>,
  ) => {
    setValue(event.target.name, event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    handleSubmit(values);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    errors,
    onChange,
    onSubmit,
    resetForm,
    setError,
    setErrors,
    setValue,
    setValues,
    values,
  };
};
