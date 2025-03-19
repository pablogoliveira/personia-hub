
import { useState, useCallback, ChangeEvent } from 'react';
import { validateField } from '@/utils/validation';

export type ValidationErrors = Record<string, string>;

export type FormState<T> = {
  values: T;
  errors: ValidationErrors;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
};

type UseFormProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
};

const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
}: UseFormProps<T>) => {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = false;
      return acc;
    }, {} as Record<keyof T, boolean>),
    isSubmitting: false,
    isValid: false,
  });

  const validateForm = useCallback(() => {
    const errors: ValidationErrors = {};
    
    Object.keys(formState.values).forEach((fieldName) => {
      const error = validateField(
        fieldName, 
        formState.values[fieldName]
      );
      
      if (error) {
        errors[fieldName] = error;
      }
    });
    
    return errors;
  }, [formState.values]);

  const setFieldValue = useCallback(
    (name: keyof T, value: any) => {
      setFormState((prev) => {
        const newValues = { ...prev.values, [name]: value };
        const error = validateField(name as string, value);
        
        const newErrors = { ...prev.errors };
        if (error) {
          newErrors[name as string] = error;
        } else {
          delete newErrors[name as string];
        }
        
        return {
          ...prev,
          values: newValues,
          errors: newErrors,
          isValid: Object.keys(newErrors).length === 0,
        };
      });
    },
    []
  );

  const setFieldTouched = useCallback(
    (name: keyof T, isTouched = true) => {
      setFormState((prev) => ({
        ...prev,
        touched: {
          ...prev.touched,
          [name]: isTouched,
        },
      }));
    },
    []
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFieldValue(name as keyof T, value);
    },
    [setFieldValue]
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      setFieldTouched(name as keyof T);
    },
    [setFieldTouched]
  );

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: Object.keys(initialValues).reduce((acc, key) => {
        acc[key as keyof T] = false;
        return acc;
      }, {} as Record<keyof T, boolean>),
      isSubmitting: false,
      isValid: false,
    });
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      const errors = validateForm();
      const isValid = Object.keys(errors).length === 0;

      // Mark all fields as touched
      const allTouched = Object.keys(formState.values).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Record<keyof T, boolean>);

      setFormState((prev) => ({
        ...prev,
        errors,
        touched: allTouched,
        isValid,
      }));

      if (isValid) {
        setFormState((prev) => ({ ...prev, isSubmitting: true }));
        try {
          await onSubmit(formState.values);
        } finally {
          setFormState((prev) => ({ ...prev, isSubmitting: false }));
        }
      }
    },
    [formState.values, onSubmit, validateForm]
  );

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    setFieldValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
