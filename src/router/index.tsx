import { createBrowserRouter } from 'react-router-dom';
import ROUTES from "./routes";
import { AppLayout, AuthLayout } from 'layouts';
import { MyProfile, Login, Register } from 'pages';

const router = createBrowserRouter([
	{
		path: ROUTES.ROOT,
		element: <AppLayout />,
		children: [
			{
				path: '',
				element: <MyProfile />
			}
		]
	},
	{
		path: ROUTES.AUTH.ROOT,
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.AUTH.LOGIN,
				element: <Login />
			},
			{
				path: ROUTES.AUTH.REGISTER,
				element: <Register />
			}
		]
	}
]);

export default router