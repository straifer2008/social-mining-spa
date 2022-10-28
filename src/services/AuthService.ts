import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	AccessTokenResponse, EmailConfirmRequest,
	LoginFormValues,
	ProfileResponse,
	RegisterCustomerValues,
	RegisterExecutorValues
} from 'types';
import { prepareHeaders, setTokenToStorage } from 'utils';
import { API_ROUTES } from 'router/api.routes';

export const authAPI = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
		prepareHeaders,
	}),
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

				return response?.data || 'none'
			},
		}),
		register: builder.mutation<{ message: string }, RegisterCustomerValues | RegisterExecutorValues>({
			query: (body) => ({
				url: API_ROUTES.AUTH.REGISTER,
				method: 'POST',
				body,
			}),
		}),
		getUser: builder.query<ProfileResponse, void>({
			query: () => ({
				url: '/v2/auth/user',
				method: 'GET',
			})
		}),
		emailConfirm: builder.mutation<{ message: string }, EmailConfirmRequest>({
			query: (body) => ({
				url: '/v2/auth/email-confirm',
				method: 'POST',
				body,
			})
		}),
		emailConfirmResend: builder.mutation<{ message: string }, { email: string }>({
			query: (body) => ({
				url: '/v2/auth/resend-code',
				method: 'POST',
				body
			})
		})
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useGetUserQuery,
	useEmailConfirmMutation,
	useEmailConfirmResendMutation
} = authAPI;
