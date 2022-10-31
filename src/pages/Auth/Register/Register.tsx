// created by Artem
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Typography } from '@mui/material';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import ROUTES from 'router/routes';
import { useGoogleAuthMutation, useRegisterMutation } from 'services';
import { useCommonSuccess, useServerError } from 'hooks';
import { RegisterCustomerValues, RegisterExecutorValues, UserRoles } from 'types';
import { Form } from './Form';
import { RoleSwitcher, AuthTitle } from '../components';
import {
	CONFIG_CUSTOMER,
	CONFIG_EXECUTOR
} from './formConfig';

export const Register: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [role, setRole] = useState<UserRoles>(UserRoles.executor);
	const [userEmail, setUserEmail] = useState<string>('test@test.com');
	const [registerQuery, { data: regData, isSuccess: isRegSuccess, isError: isRegError, error: regError }] = useRegisterMutation();
	const [googleAuth, { isError: isGoogleError, error: googleError }] = useGoogleAuthMutation();
	const code: string | null = searchParams.get('code');
	const isError = isRegError || isGoogleError;
	const error = regError || googleError;

	const onSubmitHandle = async (values: RegisterCustomerValues | RegisterExecutorValues) => {
		await registerQuery(values);
		setUserEmail(values.email);
	}

	useServerError({ isError, error });
	useCommonSuccess({
		message: regData?.message,
		callback: () => navigate(userEmail),
		condition: isRegSuccess && !!userEmail,
	});

	useEffect(() => {
		if (code && !isGoogleError) googleAuth({ code });
	}, [code, googleAuth, isGoogleError]);

	return (
		<div>
			<AuthTitle>{t('registerForm.title')}</AuthTitle>

			<RoleSwitcher setRole={setRole} value={role} />

			<Form
				onSubmit={onSubmitHandle}
				role={role}
				config={role === 'customer' ? CONFIG_CUSTOMER : CONFIG_EXECUTOR}
			/>

			<Grid container sx={{ mt: 3 }}>
				<Grid item xs={6} md={8} alignSelf="center">
					<Typography>{t('loginForm.registerLink.text1')}</Typography>
				</Grid>
				<Grid item xs={6} md={4}>
					<Button
						variant="outlined"
						component={Link}
						to={`${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGIN}`}
						fullWidth
					>
						{t('loginForm.signin')}
					</Button>
				</Grid>
			</Grid>

			<Outlet />
		</div>
	);
};
