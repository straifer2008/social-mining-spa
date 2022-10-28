export type AccessTokenResponse = {
	accessToken: string,
}

export type LoginFormValues = {
	email: string,
	password: string;
}

export type RegisterCustomerValues = {
	role: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirm: string;
	companyName: string;
	companyProfile: string;
	companyStaffQuantity: number;
}

export type RegisterExecutorValues = {
	role: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirm: string;
	gender: any;
	birthDate: string;
	countryId: string;
}

export type AuthState = {
	isAuthenticated: boolean,
}

export type ProfileResponse = {
	createdAt: string,
	email: string,
	id: number,
	firstName: string,
	lastName: string,
	phone?: string,
	role: 'customer' | 'executor',
	updatedAt: string,
}

export enum InputTypes {
	TEXT = 'text',
	PASSWORD = 'password',
	SELECT = 'select',
	DATE = 'date',
}

export type EmailConfirmRequest = {
	email: string;
	code: number
}
