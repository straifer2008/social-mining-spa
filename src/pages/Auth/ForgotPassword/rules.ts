import * as yup from 'yup';
import { emailSchema } from 'utils';

export const roles = yup.object({
	email: emailSchema()
})
