import * as yup from 'yup';
import { emailSchema } from 'utils';

export const rulesEmail = yup.object({
	email: emailSchema()
})

export const rulesCode =  yup.object({
	code: yup
		.string()
		.min(6, 'To short')
		.max(7, 'To long')
		.required('Required')
		.matches(/^[0-9\b]+$/, 'Numbers only')
})
