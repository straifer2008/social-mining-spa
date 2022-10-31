import * as yup from 'yup';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function emailSchema() {
  return yup.string().required('Please enter an email').email('Email is not valid');
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function passwordSchema() {
  return yup
	  .string()
	  .min(8)
	  .required('Password is required')
	  .matches(
			//@ts-ignore
		  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*])(?=.{8,})/,
		  "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
	  );
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function stringReqSchema(message: string) {
  return yup.string().required(`${message} is required`);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function numberReqSchema(message: string) {
  return yup.number().required(`${message} is required`);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function repeatPasswordSchema() {
  return yup.string()
    .when('password', {
      is: (val: any) => val && val.length > 0,
      then: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    }).required('Repeating password is required');
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function stringSchema() {
  return yup.string().default('').notRequired();
}
