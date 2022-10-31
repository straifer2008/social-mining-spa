import { FormConfigItem, InputTypes } from 'types';

export type FormConfigRegisterExecutor = 'role' | 'firstName' | 'lastName' | 'email' | 'password' | 'passwordConfirm' | 'gender' | 'countryId' | 'birthDate';
export const CONFIG_EXECUTOR: readonly FormConfigItem<FormConfigRegisterExecutor>[] = [
	{ name: 'firstName', label: 'registerForm.placeholderName', type: InputTypes.TEXT },
	{ name: 'lastName', label: 'registerForm.placeholderLastName', type: InputTypes.TEXT },
	{ name: 'email', label: 'registerForm.labelEmail', placeholder: 'registerForm.placeholderEmail', type: InputTypes.TEXT },
	{ name: 'password', label: 'registerForm.labelPassword', placeholder: 'registerForm.placeholderPassword', type: InputTypes.PASSWORD },
	{ name: 'passwordConfirm', label: 'registerForm.labelPasswordRepeat', placeholder: 'registerForm.placeholderPasswordRepeat', type: InputTypes.PASSWORD },
	{
		name: 'gender',
		label: 'registerForm.labelGender',
		placeholder: 'registerForm.placeholderGender',
		type: InputTypes.SELECT,
		options: [
			{label: 'Female', value: 'female'},
			{label: 'Male', value: 'male'},
			{label: 'I don`t want to specify', value: 'hidden'},
		]
	},
	{
		name: 'countryId',
		label: 'registerForm.labelCountry',
		placeholder: 'registerForm.labelCountry',
		type: InputTypes.SELECT,
		options: undefined
	},
	{ name: 'birthDate', label: 'registerForm.labelBirthDay', type: InputTypes.DATE },
];


export type FormConfigRegisterCustomer = 'role' | 'firstName' | 'lastName' | 'email' | 'password' | 'passwordConfirm' | 'companyName' | 'companyProfile' | 'companyStaffQuantity';
export const CONFIG_CUSTOMER: readonly FormConfigItem<FormConfigRegisterCustomer>[] = [
	{ name: 'firstName', label: 'registerForm.placeholderName', type: InputTypes.TEXT },
	{ name: 'lastName', label: 'registerForm.placeholderLastName', type: InputTypes.TEXT },
	{ name: 'email', label: 'registerForm.labelEmail', placeholder: 'registerForm.placeholderEmail', type: InputTypes.TEXT },
	{ name: 'password', label: 'registerForm.labelPassword', placeholder: 'registerForm.placeholderPassword', type: InputTypes.PASSWORD },
	{ name: 'passwordConfirm', label: 'registerForm.labelPasswordRepeat', placeholder: 'registerForm.placeholderPasswordRepeat', type: InputTypes.PASSWORD },
	{ name: 'companyName', label: 'registerForm.placeholderCompanyName', type: InputTypes.TEXT },
	{ name: 'companyProfile', label: 'registerForm.placeholderCompanyProfile', type: InputTypes.TEXT },
	{
		name: 'companyStaffQuantity',
		label: 'registerForm.placeholderCompanyStaffQuantity',
		type: InputTypes.SELECT,
		options: [
			{ label: '2-5', value: 5 },
			{ label: '6-10', value: 10 },
			{ label: '11-20', value: 20 },
			{ label: '21-50', value: 50 },
			{ label: 'Over 50', value: 50 },
		]
	},
];
