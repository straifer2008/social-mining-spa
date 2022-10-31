// created by Artem
import { ChangeEvent, FC, useState } from 'react';
import { Button, Stack, styled, TextField, Typography, CircularProgress } from '@mui/material';
import { Dialog } from 'shared';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmailConfirmMutation, useEmailConfirmResendMutation } from 'services';
import { useCommonSuccess, useServerError } from 'hooks';

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

	useServerError({
		error: confirmError || resendError,
		isError: confirmIsError || resendIsError
	});
	useCommonSuccess({
		message: resendData?.message || confirmData?.message,
		condition: (resendIsSuccess && !!resendData?.message) || (confirmIsSuccess && !!confirmData?.message),
		callback: () => confirmIsSuccess && navigate('/')
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


const ConfirmCodeInput = styled(TextField)`
	.MuiInputBase-root {
    padding: 50px 40px;
    background-color: #EBECF04D;
	}
	
	.MuiInputBase-input {
    color: #0E1D40;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
		letter-spacing: 40px;
    line-height: 141%;
		text-align: center;
		@media screen and (max-width: 768px) {
      font-size: 24px;
      letter-spacing: 30px;
			padding-right: 0;
			padding-left: 0;
		}
	}
`;
