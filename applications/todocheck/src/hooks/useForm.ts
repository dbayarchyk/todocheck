import { useState, useEffect, useRef } from "react";

export const useForm = <TValues extends object>(
  initialValues: TValues,
  handleSubmit: (values: TValues) => void
) => {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<{ [field: string]: string | undefined }>(
    {}
  );

  const prevInitialValuesString = useRef<string>();
  const currentInitialValuesString = JSON.stringify(initialValues);

  useEffect(() => {
    if (prevInitialValuesString.current !== currentInitialValuesString) {
      resetForm();
    }

    prevInitialValuesString.current = currentInitialValuesString;
  }, [prevInitialValuesString.current, currentInitialValuesString]);

  const setValue = (field: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const setError = (field: string, message: string) => {
    setErrors((prevValues) => ({
      ...prevValues,
      [field]: message,
    }));
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
