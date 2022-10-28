// created by Artem
import { FC, KeyboardEvent } from 'react';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { FieldError } from 'react-hook-form';
import moment, { Moment } from 'moment';
import { InputBaseProps } from '@mui/material/InputBase';

type DatePickerProps = {
	setValue: (isoDate: string) => any,
	onBlur?: InputBaseProps['onBlur'],
	value: string | number,
	error?: FieldError,
	label: string,
	inputFormat?: string;
};
export const DatePicker: FC<DatePickerProps> = ({ label, value, error, setValue, onBlur, inputFormat= 'MM/DD/YYYY'}) => {
	const changeHandle = (val: Moment | null) => setValue(val?.toISOString() || '');

	const disableTypingHandle = (e: KeyboardEvent<any>) => e.preventDefault();

	return (
		<DesktopDatePicker
			onChange={changeHandle}
			value={moment(value)}
			label={label}
			inputFormat={inputFormat}
			renderInput={(params) => (
				<TextField
					{...params}
					onBlur={onBlur}
					inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
					onKeyDown={disableTypingHandle}
					helperText={error?.message}
					error={!!error}
					fullWidth
					disabled
				/>
			)}
		/>
	);
};
