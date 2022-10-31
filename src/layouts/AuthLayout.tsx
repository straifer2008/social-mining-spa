// created by Artem
import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Typography } from '@mui/material';
import { selectAuthenticationState } from "store/auth";
import ROUTES from "router/routes";
import Logo from 'assets/images/Logo.svg';
import { Card, LoadingScreen } from 'shared';
import './AuthLayout.scss';
import { getTokenFromStorage } from 'utils';
import { useGetUserQuery } from 'services';

type AuthLayoutProps = {};
export const AuthLayout: FC<AuthLayoutProps> = () => {
	const location = useLocation();
	const storedToken = getTokenFromStorage();
	const isAuthenticated = useSelector(selectAuthenticationState);
	const { isLoading } = useGetUserQuery(undefined, { skip: !storedToken });

	if (isLoading) return <LoadingScreen />

	if (isAuthenticated) {
		return <Navigate to={ROUTES.ROOT} />;
	}


	return (
		<div className="auth-layout">
			<div className="auth-layout__left">
				<img className="logo" src={Logo}  alt="logo" />
				{location?.pathname === `${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGIN}` && (
					<div>
						<Typography component="h1">
							Welcome to Grand Time social
							mining platform!
						</Typography>
					</div>
				)}
				{location?.pathname === `${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.REGISTER}` && (
					<div>
						<Typography component="h1">
							The Place To Earn, Learn, Communicate & Share Your Experience
						</Typography>
						<Typography className="desc">
							Leveraging the capabilities of blockchain technology, Grand Time provides an effective way for people in all countries and skill levels to earn cryptocurrency. By earning Grand tokens that can be freely exchanged on our platform for any other cryptocurrencies or goods & services, members not only gain financial independence but join a growing community of like-minded people.
						</Typography>
					</div>
				)}
			</div>
			<div className="auth-layout__form">
				<Card>
					<Outlet />
				</Card>
			</div>
		</div>
	);
};
