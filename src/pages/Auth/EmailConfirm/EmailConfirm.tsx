// created by Artem
import { ChangeEvent, FC, useState } from 'react';
import { Button, Stack, Typography, CircularProgress } from '@mui/material';
import { Dialog } from 'shared';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmailConfirmMutation, useEmailConfirmResendMutation } from 'services';
import { useCommonSuccess, useServerError } from 'hooks';
import { ConfirmCodeInput } from '../components';

type EmailConfirmDialogProps = {};
export const EmailConfirm: FC<EmailConfirmDialogProps> = () => {
	const navigate = useNavigate();
	const { email } = useParams<{ email: string }>();
	const [code, setCode] = useState<number>();
	const [emailConfirmRequest, {
		data: confirmData,
		isSuccess: confirmIsSuccess,
		isLoading: confirmLoading,
		isError: confirmIsError,
		error: confirmError
	}] = useEmailConfirmMutation();
	const [resendEmailConfirmRequest, {
		data: resendData,
		isSuccess: resendIsSuccess,
		isLoading: resendLoading,
		isError: resendIsError,
		error: resendError
	}] = useEmailConfirmResendMutation();

	useServerError({ error: confirmError, isError: confirmIsError });
	useServerError({ error: resendError, isError: resendIsError });

	useCommonSuccess({ message: resendData?.message, condition: resendIsSuccess });
	useCommonSuccess({
		message: confirmData?.message,
		condition: confirmIsSuccess,
		callback: () => navigate('/')
	});

	const changeCodeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const regex = /^[0-9\b]+$/;
		if (e.target.value === "" || regex.test(e.target.value)) {
			console.log(e.target.value)
			setCode(Number(e.target.value));
		} else {
			e.preventDefault();
		}
	};

	const confirmHandle = () => {
		if (code && email) {
			emailConfirmRequest({ code: Number(code), email })
		}
	};

	const resendHandle = () => {
		if (email) {
			resendEmailConfirmRequest({ email });
		}
	}

	return (
		<>
			<Dialog
				title="Confirm your email!"
				open={!!email}
				maxWidth="sm"
			>
				<Stack sx={{ mt: 2, mb: 4, maxWidth: '75%' }}>
					<Typography>Hi,</Typography>
					<Typography>Thank you for signing up with GrandTime!</Typography>
					<Typography>Enter the verification code that was sent to <em>{email}</em>.</Typography>
				</Stack>

				<Stack sx={{ mt: 2, mb: 4 }}>
					<ConfirmCodeInput
						type="new-password"
						error={`${code}`.length < 6}
						required
						fullWidth
						value={code || ''}
						onChange={changeCodeHandle}
						inputProps={{ minLength: 6, maxLength: 6, autoComplete: 'new-password' }}
					/>
				</Stack>

				<Stack sx={{ mt: 2, mb: 4 }}>
					<Button
						onClick={confirmHandle}
						variant="contained"
						fullWidth
						disabled={confirmLoading}
					>{confirmLoading? <CircularProgress /> : 'Confirm'}</Button>
					<Button
						onClick={resendHandle}
						variant="text"
						fullWidth
					>{resendLoading ? <CircularProgress /> : 'Resend code'}</Button>
				</Stack>
			</Dialog>
		</>
	);
};
