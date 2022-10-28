// created by Artem
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button, Grid, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import ROUTES from 'router/routes';
import { useRegisterMutation } from 'services';
import { useServerError } from 'hooks';
import { Notification } from 'shared';
import { Form } from './Form';
import { RoleSwitcher } from '../components';
import {
	CONFIG_CUSTOMER,
	CONFIG_EXECUTOR
} from './formConfig';

export const Register: FC = () => {
	const { t } = useTranslation();
	const [role, setRole] = useState<'customer' | 'executor'>('executor');
	const [registerQuery, { data: response, isError, error: serverError }] = useRegisterMutation();

	const { message, setMessage } = useServerError({ isError, error: serverError });

	const handleCloseNotification = () => setMessage();

	const onSubmitHandle = (values) => {
		registerQuery(values);
	}

	return (
		<div>
			<Title>{t('registerForm.title')}</Title>

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

			<Notification
				onClose={handleCloseNotification}
				open={!!message || !!response?.message}
				content={message || response?.message}
				severity={ isError ? 'error' : 'success'}
			/>

			<Outlet />
		</div>
	);
};

const Title = styled.h5`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 141%;
  text-align: center;
  color: #0E1D40;
	margin-bottom: 40px;
`
