import React, { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CssTextField } from './styles';
import { TextFieldProps } from '@mui/material';

type FormInputProps = {
  name: string;
  label: string;
  variant?: 'filled' | 'outlined' | 'standard';
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({ type, variant = 'outlined', name, label, ...props }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <CssTextField
          {...field}
          {...props}
          variant={variant}
          label={label}
          fullWidth
          margin="dense"
          sx={{ mb: '1.5rem' }}
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as unknown as string) : ''}
        />
      )}
    />
  );
};

export default FormInput;
