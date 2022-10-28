import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { FieldError, UseFormSetValue } from 'react-hook-form';
import { usePasswordField } from 'hooks';
import { InputTypes, Option } from 'types';
import { Autocomplete, DatePicker, Iconify } from 'shared';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';
import { InputBaseProps } from '@mui/material/InputBase';

type InputProps = {
	onBlur?: InputBaseProps['onBlur'],
  onChange?: StandardInputProps['onChange'],
	setValue?: UseFormSetValue<any>,
  value: string | number,
  error?: FieldError,
  label: string,
  type?: InputTypes;
  placeholder?: string;
  options?: Option<string | number>[];
	name?: string;
}

export const Input:React.FC<InputProps> = ({
  onBlur,
	onChange,
	value,
	name,
	error,
	setValue,
	label = 'New password',
	type = InputTypes.TEXT,
	placeholder,
	options
}): JSX.Element => {
  const { isShowPassword, togglePasswordVisibility } = usePasswordField();

	const setDateHandle = (isoDate: string) => name && setValue && setValue(name, isoDate);

	if (name && type === InputTypes.DATE) {
		return (
			<DatePicker
				setValue={setDateHandle}
				onBlur={onBlur}
				value={value}
				label={label}
				error={error}
			/>
		)
	}

	if (name && setValue && options?.length && type === InputTypes.SELECT) {
		return (
			<Autocomplete
				name={name}
				value={value || ''}
				error={error}
				label={label}
				options={options}
				setValue={setValue}
				disableClearable
			/>
		)
	}

	if (type && onChange && (InputTypes.TEXT || InputTypes.PASSWORD)) {
		return (
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
				inputProps={{ autoComplete: 'new-password' }}
				helperText={error?.message}
				{...(type === InputTypes.PASSWORD && {
					InputProps: {
						autoComplete: 'new-password',
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
		)
	}

  return <span />;
};
