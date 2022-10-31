
export type DefaultResponse = {
	message: string;
}

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
	user: ProfileResponse | null,
}

export enum UserRoles {
	customer = 'customer',
	executor = 'executor',
}

export type ProfileResponse = {
	id: number;
	role: UserRoles;
	firstName: string;
	lastName: string;
	email: string;
	walletAddress: any;
	isConfirmed: boolean;
	profile: {
		id: number;
		jwtVersion: number;
		userId: number;
		countryId: number;
		gender: string;
		langId: any;
		taskLangId: any;
		webNotify: boolean;
		mobileNotify: boolean;
		birthDate: string | null;
		telegram: string | null;
		facebook: string | null;
		instagram: string | null;
		whatsapp: string | null;
	}
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

export type SocialRegisterBody = {
	code: string;
}
