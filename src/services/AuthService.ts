import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	AccessTokenResponse,
	DefaultResponse,
	EmailConfirmRequest,
	LoginFormValues,
	ProfileResponse,
	RegisterCustomerValues,
	RegisterExecutorValues,
	SocialRegisterBody
} from 'types';
import { prepareHeaders, removeTokenFromStorage, setTokenToStorage } from 'utils';
import { API_ROUTES } from 'router/api.routes';

export const authAPI = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
		prepareHeaders,
	}),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		login: builder.mutation<AccessTokenResponse, LoginFormValues>({
			query: (body) => ({
				url: API_ROUTES.AUTH.LOGIN,
				method: 'POST',
				body,
			}),
			transformResponse: (response: any, meta, body) => {
				const token = meta?.response?.headers?.get('authorization');
				if (token) setTokenToStorage(token);

				return response
			},
			invalidatesTags: ['User']
		}),
		logout: builder.mutation<DefaultResponse, void>({
			query: () => ({
				url: API_ROUTES.AUTH.LOGOUT,
				method: 'POST',
			}),
			transformResponse: (response: DefaultResponse) => {
				removeTokenFromStorage();

				return response;
			}
		}),
		register: builder.mutation<DefaultResponse, RegisterCustomerValues | RegisterExecutorValues>({
			query: (body) => ({
				url: API_ROUTES.AUTH.REGISTER,
				method: 'POST',
				body,
			}),
		}),
		getUser: builder.query<ProfileResponse, void>({
			query: () => ({
				url: API_ROUTES.AUTH.GET_USER,
				method: 'GET',
			}),
			providesTags: ['User']
		}),
		emailConfirm: builder.mutation<DefaultResponse, EmailConfirmRequest>({
			query: (body) => ({
				url: API_ROUTES.AUTH.EMAIL_CONFIRM,
				method: 'POST',
				body,
			})
		}),
		emailConfirmResend: builder.mutation<DefaultResponse, { email: string }>({
			query: (body) => ({
				url: API_ROUTES.AUTH.EMAIL_CONFIRM_RESEND,
				method: 'POST',
				body
			}),
			transformResponse: (response: any, meta, body) => {
				const token = meta?.response?.headers?.get('authorization');
				if (token) setTokenToStorage(token);

				return response
			},
		}),
		forgotPassword: builder.mutation<DefaultResponse, { email: string }>({
			query: (body) => ({
				url: API_ROUTES.AUTH.FORGOT_PASSWORD,
				method: 'POST',
				body,
			})
		}),
		googleAuth: builder.mutation<any, SocialRegisterBody>({
			query: (body: SocialRegisterBody) => ({
				url: API_ROUTES.AUTH.GOOGLE_AUTH,
				method: 'POST',
				body
			})
		}),
		facebookAuth: builder.mutation<any, SocialRegisterBody>({
			query: (body: SocialRegisterBody) => ({
				url: API_ROUTES.AUTH.FACEBOOK_AUTH,
				method: 'POST',
				body
			})
		}),
		walletConnect: builder.mutation({
			query: (body) => ({
				url: API_ROUTES.AUTH.WALLET_CONNECT,
				method: 'POST',
				body
			})
		}),
		walletRegister: builder.mutation({
			query: (body) => ({
				url: API_ROUTES.AUTH.WALLET_REGISTER,
				method: 'POST',
				body
			})
		}),
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useForgotPasswordMutation,
	useGetUserQuery,
	useEmailConfirmMutation,
	useEmailConfirmResendMutation,
	useLogoutMutation,
	useGoogleAuthMutation,
	useFacebookAuthMutation,
	useWalletConnectMutation,
	useWalletRegisterMutation
} = authAPI;
