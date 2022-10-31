// created by Artem
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';
import { Button, Checkbox, FormControlLabel, Grid, Stack, Link as MuiLink } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormConfigItem, RegisterCustomerValues, RegisterExecutorValues } from 'types';
import { Input } from 'shared';
import { useCountriesQuery } from 'services';
import { SOCIAL } from 'router/api.routes';
import { customerRules, executorRules } from './rules';
import { FormConfigRegisterCustomer, FormConfigRegisterExecutor } from './formConfig';
import { AuthButton, AuthDivider } from '../components';
import GoogleImg from 'assets/images/icons/google-icon.svg';
import FacebookImg from 'assets/images/icons/facebook-icon.svg';

type FormProps = {
	onSubmit: (values: RegisterCustomerValues | RegisterExecutorValues) => void;
	role: 'customer' | 'executor';
	config: readonly FormConfigItem<FormConfigRegisterCustomer | FormConfigRegisterExecutor>[];
};
export const Form: FC<FormProps> = ({ onSubmit, role, config }) => {
	const { t } = useTranslation();
	const { data: countries } = useCountriesQuery();

	const {
		handleSubmit,
		control,
		setValue,
		trigger,
		formState: { isSubmitting },
		reset,
	} = useForm<RegisterCustomerValues | RegisterExecutorValues>({
		resolver: yupResolver(role === 'customer' ? customerRules : executorRules),
		defaultValues: { role },
	});

	const setForValueHandle: UseFormSetValue<RegisterCustomerValues | RegisterExecutorValues> = async (name, val) => {
		setValue(name, val as any)
		await trigger(name);
	}

	useEffect(() => {
		reset();
		setValue('role', role);
	}, [role, reset, setValue]);


	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={2}>
				{config.map(({ name, label, type, placeholder, options }) => (
					<Grid item xs={6} key={name}>
						<Controller
							name={name}
							control={control}
							defaultValue=""
							render={({
								         field: { onBlur, onChange, value },
								         fieldState: { error }
							         }): JSX.Element => (
								<Input
									name={name}
									onChange={onChange}
									setValue={setForValueHandle}
									onBlur={onBlur}
									value={value}
									error={error}
									label={t(label)}
									placeholder={placeholder && t(placeholder)}
									type={type}
									options={name === 'countryId' ? countries : options}
								/>
							)}
						/>
					</Grid>
				))}
			</Grid>

			<Stack sx={{ mt: 2, mb: 4 }} justifyContent="flex-start" flexDirection="column" justifyItems="flex-start" alignItems="flex-start">
				<FormControlLabel control={<Checkbox color="primary" defaultChecked />} label="I agree to Terms & Conditions" />
				<FormControlLabel control={<Checkbox color="primary" defaultChecked />} label="Captcha" />
			</Stack>

			<Button
				size="large"
				type="submit"
				color="primary"
				variant="contained"
				disabled={isSubmitting}
				fullWidth
			>
				{t('registerForm.title')}
			</Button>

			<AuthDivider>{t('loginForm.Or_use_services')}</AuthDivider>

			<Grid container spacing={2}>
				<Grid item xs={12} md={12} lg={4}>
					<AuthButton icon={GoogleImg} component={MuiLink} href={SOCIAL.GOOGLE}>
						{t('loginForm.Sign_up_with_Google')}
					</AuthButton>
				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					<AuthButton icon={FacebookImg} component={MuiLink} href={SOCIAL.FACEBOOK}>
						{t('loginForm.Sign_up_with_Facebook')}
					</AuthButton>
				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					<AuthButton icon={FacebookImg}>
						{t('loginForm.Sig_up_with_Wallet')}
					</AuthButton>
				</Grid>
			</Grid>
		</form>
	);
};
