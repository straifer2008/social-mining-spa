import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AccessTokenResponse, LoginFormValues, RegisterValues } from 'types';
import { prepareHeaders } from 'utils';
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
		}),
		register: builder.mutation<AccessTokenResponse, RegisterValues>({
			query: (body) => ({
				url: API_ROUTES.AUTH.REGISTER,
				method: 'POST',
				body,
			}),
		}),
	})
});

export const { useLoginMutation, useRegisterMutation } = authAPI;
