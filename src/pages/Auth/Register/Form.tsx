// created by Artem
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { RegisterValues } from 'types';
import { CONFIG } from './formConfig';
import { Input } from 'shared';


type FormProps = {};
export const Form: FC<FormProps> = () => {
	const { t } = useTranslation();
	const {
		handleSubmit,
		control,
	} = useForm<RegisterValues>();

	const onSubmit = (data: RegisterValues) => {
		console.log(data, '----REGISTER');
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{CONFIG.map(({ name, label, type, placeholder }) => (
					<Controller
						key={name}
						name={name}
						control={control}
						defaultValue=""
						render={({ field: { onBlur, onChange, value }, fieldState: { error } }): JSX.Element => (
							<Input
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								error={error}
								label={t(label)}
								placeholder={placeholder && t(placeholder)}
								type={type}
							/>
						)}
					/>
				)}
			</form>
		</>
	);
};
