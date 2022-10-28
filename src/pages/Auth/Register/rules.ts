import * as yup from 'yup';
import { emailSchema, numberReqSchema, passwordSchema, repeatPasswordSchema, stringReqSchema } from 'utils';

export const executorRules = yup.object({
	role: yup.string().required(),
	firstName: stringReqSchema('Name').min(2),
	lastName: stringReqSchema('Last name').min(2),
	email: emailSchema(),
	password: passwordSchema(),
	passwordConfirm: repeatPasswordSchema(),
	gender: stringReqSchema('Gender'),
	birthDate: stringReqSchema('Birth date'),
	countryId: stringReqSchema('Country'),
});

export const customerRules = yup.object({
	role: yup.string().required(),
	firstName: stringReqSchema('Name').min(2),
	lastName: stringReqSchema('Last name').min(2),
	email: emailSchema(),
	password: passwordSchema(),
	passwordConfirm: repeatPasswordSchema(),
	companyName: stringReqSchema('Company name'),
	companyProfile: stringReqSchema('Company profile'),
	companyStaffQuantity: numberReqSchema('Staff quality'),
});

// "password must contain min 1 uppercase letter, lowercase letter, special character, number, min 8 in length"
