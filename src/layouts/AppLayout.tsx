// created by Artem
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthenticationState } from "store/auth";
import ROUTES from "router/routes";
import { Sidebar, Header } from './components';

type AppLayoutProps = {};
export const AppLayout: FC<AppLayoutProps> = () => {
	const isAuthenticated = useSelector(selectAuthenticationState);

	if (isAuthenticated) {
		return <Navigate to={`${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGIN}`} />
	}

	return (
		<div>
			<Header>
				<h1>AppLayout</h1>
			</Header>

			<Sidebar />

			<Outlet />
		</div>
	);
};
