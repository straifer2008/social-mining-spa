// created by Artem
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthenticationState } from "store/auth";
import ROUTES from "router/routes";
import { Sidebar, Header } from './components';
import { useGetUserQuery, useLogoutMutation } from 'services';
import { getTokenFromStorage } from 'utils';
import { useServerError } from 'hooks';
import { LoadingScreen } from 'shared';
import { Button } from '@mui/material';

type AppLayoutProps = {};
export const AppLayout: FC<AppLayoutProps> = () => {
	const isAuthenticated = useSelector(selectAuthenticationState);
	const storedToken = getTokenFromStorage();
	const { isError, error, isLoading } = useGetUserQuery(undefined, { skip: !storedToken });
	const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

	useServerError({ isError, error });

	const logoutHandle = async() => await logout();

	if (isLoading || logoutLoading) return <LoadingScreen />

	if (!storedToken || (isError && !isAuthenticated)) {
		return <Navigate to={`${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGIN}`} />
	}

	return (
		<div>
			<Header>
				<h1>AppLayout</h1>
			</Header>

			<Sidebar />

			<Button onClick={logoutHandle}>Logout</Button>

			<Outlet />
		</div>
	);
};
