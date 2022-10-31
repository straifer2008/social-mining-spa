import * as yup from 'yup';
import { passwordSchema, repeatPasswordSchema } from 'utils';

export const rules = yup.object({
	password: passwordSchema(),
	passwordConfirm: repeatPasswordSchema(),
})
