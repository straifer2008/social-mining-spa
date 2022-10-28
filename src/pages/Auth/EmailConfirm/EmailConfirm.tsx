// created by Artem
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Stack, styled, TextField, Typography, CircularProgress } from '@mui/material';
import { Dialog, Notification } from 'shared';
import { useParams } from 'react-router-dom';
import { useEmailConfirmMutation, useEmailConfirmResendMutation } from 'services';
import { useAPIError, useServerError } from 'hooks';

type EmailConfirmDialogProps = {};
export const EmailConfirm: FC<EmailConfirmDialogProps> = () => {
	const { email } = useParams<{ email: string }>();
	const { addError } = useAPIError()
	const [code, setCode] = useState<number>();
	const [emailConfirmRequest, { isLoading, isError, error }] = useEmailConfirmMutation();
	const [resendEmailConfirmRequest, {
		isLoading: resendLoading,
		isError: resendIsError,
		error: resendError
	}] = useEmailConfirmResendMutation();
	const { message, setMessage } = useServerError({ error, isError });
	const {
		message: resendMessage,
		setMessage: setResendMessage
	} = useServerError({ error: resendError, isError: resendIsError });

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

	const handleCloseNotification = () => {
		setMessage();
		setResendMessage();
	}

	useEffect(() => {
		const msg = message || resendMessage;
		if (msg) {
			addError({message: msg});
		}
	}, [resendMessage, message, addError]);


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
						required
						fullWidth
						value={code || ''}
						onChange={changeCodeHandle}
						inputProps={{ maxLength: 6, autoComplete: 'new-password' }}
					/>
				</Stack>

				<Stack sx={{ mt: 2, mb: 4 }}>
					<Button
						onClick={confirmHandle}
						variant="contained"
						fullWidth
						disabled={isLoading}
					>{isLoading? <CircularProgress /> : 'Confirm'}</Button>
					<Button
						onClick={resendHandle}
						variant="text"
						fullWidth
					>{resendLoading ? <CircularProgress /> : 'Resend code'}</Button>
				</Stack>
			</Dialog>

			<Notification
				onClose={handleCloseNotification}
				open={!!message || !!resendMessage}
				content={message || resendMessage}
				severity="error"
			/>
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
