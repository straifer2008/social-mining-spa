import React from 'react';
import { IconButton, InputAdornment, styled, TextField as MuiTextField } from '@mui/material';
import { FieldError } from 'react-hook-form';
import { usePasswordField } from '../../hooks';
import { InputTypes } from '../../types';
import { Iconify } from '../../shared';
import { InputProps as StandardInputProps } from "@mui/material/Input/Input";
import { InputBaseProps } from "@mui/material/InputBase";

type InputProps = {
	onBlur?: InputBaseProps['onBlur'],
  onChange: StandardInputProps['onChange'],
  value: string,
  error?: FieldError,
  label: string,
  type?: 'text' | 'password'
  placeholder?: string;
}

export const Input:React.FC<InputProps> = ({
  onBlur, onChange, value, error, label = 'New password', type = InputTypes.TEXT, placeholder
}): JSX.Element => {
  const { isShowPassword, togglePasswordVisibility } = usePasswordField();
  return (
    <>
      {/* fake input for disabling autocomplete */}
      <input type="password" name="fake-password" autoComplete="new-password" style={{ display: 'none' }} />
      <TextField
        autoComplete="new-password"
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        fullWidth
        type={isShowPassword ? 'text' : type}
        label={label}
        error={!!error}
        helperText={error?.message}
        {...(type === InputTypes.PASSWORD && {
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  <Iconify icon={isShowPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        })
      }
      />
    </>
  );
};

const TextField = styled(MuiTextField)`
  //.MuiInputBase-root {
  //  font-family: 'Poppins', sans-serif;
  //  font-style: normal;
  //  font-weight: 400;
  //  font-size: 17px;
  //  line-height: 26px;
  //  border-radius: 8px; 
  //  height: 55px;
  //}
  //.MuiFormLabel-root {
  //  color: #B5BBC6;
  //}
`;
