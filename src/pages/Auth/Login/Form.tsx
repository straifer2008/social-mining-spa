import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { Input } from 'shared';
import { useLoginMutation } from 'services';
import { useServerError, useSetTokenToStorage } from 'hooks';
import { FormConfigItem, InputTypes, LoginFormValues } from "types";
import rules from './rules';
import { useTranslation } from 'react-i18next';
import GoogleImg from 'assets/images/icons/google-icon.svg';
import FacebookImg from 'assets/images/icons/facebook-icon.svg';
import { AuthButton, AuthDivider } from '../components';
import ROUTES from 'router/routes';

const CONFIG: readonly FormConfigItem<'email' | 'password'>[] = [{
	name: 'email',
	label: 'loginForm.labelEmail',
	placeholder: 'loginForm.placeholderEmail',
	type: InputTypes.TEXT,
},
	{
		name: 'password',
		label: 'loginForm.labelPassword',
		placeholder: 'loginForm.placeholderPassword',
		type: InputTypes.PASSWORD,
	}] as const;

export const Form: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const form = useForm<LoginFormValues>({
    resolver: yupResolver(rules),
    defaultValues: {
	    email: '',
	    password: ''
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  const [login, { data: result, isError, error: serverError }] = useLoginMutation();

  const onSubmit = (data: LoginFormValues) => login(data);

  useSetTokenToStorage({ result });

  useServerError({ isError, error: serverError });

  return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={3}>
					{CONFIG.map(({ name, label, type, placeholder }) => (
						<Controller
							key={name}
							name={name}
							control={control}
							defaultValue=""
							render={({
								         field: { onBlur, onChange, value }, fieldState: { error },
							         }): JSX.Element => (
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
					))}
				</Stack>

				<Stack sx={{ mt: 2, mb: 4 }} justifyContent="flex-start">
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
					{t('loginForm.submit')}
				</Button>

				<AuthDivider>{t('loginForm.Or_use_services')}</AuthDivider>

				<Grid container spacing={2}>
					<Grid item xs={12}>
						<AuthButton icon={GoogleImg}>
							{t('loginForm.Sign_up_with_Google')}
						</AuthButton>
					</Grid>
					<Grid item xs={6}>
						<AuthButton icon={FacebookImg}>
							{t('loginForm.Sign_up_with_Facebook')}
						</AuthButton>
					</Grid>
					<Grid item xs={6}>
						<AuthButton icon={FacebookImg}>
							{t('loginForm.Sig_up_with_Wallet')}
						</AuthButton>
					</Grid>
				</Grid>

				<Grid container sx={{ mt: 3 }}>
					<Grid item xs={6} md={8} alignSelf="center">
						<Typography>{t('loginForm.registerLink.text1')}</Typography>
					</Grid>
					<Grid item xs={6} md={4}>
						<Button
							variant="outlined"
							component={Link}
							to={`${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.REGISTER}`}
							fullWidth
						>
							{t('loginForm.registerLink.text2')}
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
  );
};
