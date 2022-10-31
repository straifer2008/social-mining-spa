import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from 'utils';
import { CountryItem, Option } from 'types';
import { API_ROUTES } from 'router/api.routes';

export const locationApi = createApi({
	reducerPath: 'locationApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
		prepareHeaders,
	}),
	endpoints: (build) => ({
		countries: build.query<Option<string | number>[], void>({
			query: () => ({
				url: API_ROUTES.LOCATION.COUNTRIES,
				method: 'GET',
			}),
			transformResponse: (response: any) => (response?.data as CountryItem[])?.map((v) => ({ label: v?.name, value: v?.id }))
		})
	})
});

export const {
	useCountriesQuery
} = locationApi;
