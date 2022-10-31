// created by Artem
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthTitle } from '../components';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'shared';
import { InputTypes } from 'types';
import { Button, Stack, Typography, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from 'router/routes';
import { rulesCode, rulesEmail } from './rules';
import { useForgotCodeMutation, useForgotPasswordMutation } from 'services';
import { useCommonSuccess, useServerError } from 'hooks';
import { ConfirmCodeInput } from '../components';

type ForgotPasswordProps = {};
export const ForgotPassword: FC<ForgotPasswordProps> = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [onForgot, { isError: isEmailError, error: emailError, isSuccess: isEmailSuccess, data: emailData }] = useForgotPasswordMutation();
	const [sendCode, { isError: isCodeError, error: codeError, isSuccess: isCodeSuccess, data: codeData }] = useForgotCodeMutation();

	const emailForm = useForm<{ email: string }>({ resolver: yupResolver(rulesEmail), defaultValues: { email: '' } });
	const codeForm = useForm<{ code: string }>({ resolver: yupResolver(rulesCode), defaultValues: { code: '' } });
	const email = emailForm.getValues('email');
	const isShowCodeForm = !!email && isEmailSuccess;

	useServerError({ isError: isEmailError, error: emailError });
	useServerError({ isError: isCodeError, error: codeError });
	useCommonSuccess({ message: emailData?.message, condition: isEmailSuccess });
	useCommonSuccess({
		message: codeData?.message,
		condition: isCodeSuccess,
		callback: () => {
			console.log(codeData, '---codeData')
			if (isCodeSuccess && codeData?.userId) navigate(`${codeData.userId}`);
		}
	});

	const backHandle = () => {
		emailForm.reset({ email: '' });
		codeForm.reset({ code: '' });
	}

	const submitEmailHandle = (values: { email: string }) => onForgot(values);
	const submitCodeHandle = (values: { code: string }) => sendCode({ code: Number(values.code), email });

	return (
		<div>
			<AuthTitle>{t('resetPasswordForm.title')}</AuthTitle>
			{isShowCodeForm ? (
				<>
					<form onSubmit={codeForm.handleSubmit(submitCodeHandle)}>
						<Stack sx={{ mt: 2, mb: 4, maxWidth: '75%' }}>
							<Typography>Hi,</Typography>
							<Typography>Enter the verification code that was sent to <em>{emailForm.getValues('email')}</em>.</Typography>
						</Stack>

						<Stack sx={{ mt: 2, mb: 4 }}>
							<Controller
								name="code"
								control={codeForm.control}
								defaultValue=""
								render={({field, fieldState}) => (
									<ConfirmCodeInput
										type="new-password"
										required={false}
										fullWidth
										onChange={field.onChange}
										onBlur={field.onBlur}
										value={field.value}
										error={!!fieldState.error}
										helperText={fieldState?.error?.message}
										inputProps={{ autoComplete: 'new-password' }}
									/>
								)}
							/>
						</Stack>

						<Button
							size="large"
							type="submit"
							color="primary"
							variant="contained"
							disabled={codeForm.formState.isSubmitting}
							fullWidth
						>{t('resetPasswordForm.submit')}</Button>
					</form>
					<Stack justifyContent="flex-end" flexDirection="row" sx={{ mt: 2, mb: 3 }}>
						<MuiLink onClick={backHandle}>Back</MuiLink>
					</Stack>
				</>
			) : (
				<>
					<form onSubmit={emailForm.handleSubmit(submitEmailHandle)}>
						<Stack sx={{ mb: 3 }}>
							<Controller
								name="email"
								control={emailForm.control}
								defaultValue=""
								render={({field, fieldState}) => (
									<Input
										onChange={field.onChange}
										onBlur={field.onBlur}
										value={field.value}
										error={fieldState.error}
										label={t('resetPasswordForm.labelEmail')}
										placeholder={t('resetPasswordForm.placeholderEmail')}
										type={InputTypes.TEXT}
									/>
								)}
							/>
						</Stack>

						<Button
							size="large"
							type="submit"
							color="primary"
							variant="contained"
							disabled={emailForm.formState.isSubmitting}
							fullWidth
						>{t('resetPasswordForm.submit')}</Button>
					</form>

					<Stack justifyContent="flex-end" flexDirection="row" sx={{ mt: 2, mb: 3 }}>
						<Link to={`${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGIN}`}>
							{t('resetPasswordForm.lonkLogin')}
						</Link>
					</Stack>
				</>
			)}
		</div>
	);
};
