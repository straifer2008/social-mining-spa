// created by Artem
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { useResetPasswordMutation } from 'services';
import { useCommonSuccess, useServerError } from 'hooks';
import { InputTypes, ResetPasswordValues } from 'types';
import { Input } from 'shared';
import { rules } from './rules';
import { AuthTitle } from '../components';

type ResetPasswordProps = {};
export const ResetPassword: FC<ResetPasswordProps> = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { userId } = useParams<{userId: string}>();
	const form = useForm<ResetPasswordValues>({
		resolver: yupResolver(rules),
		defaultValues: { userId }
	});
	const [resetPassword, { data, isError, error, isSuccess}] = useResetPasswordMutation();

	const submitHandle = (v: ResetPasswordValues) => resetPassword(v);

	useServerError({ isError, error });
	useCommonSuccess({
		message: data?.message,
		condition: isSuccess,
		callback: () => navigate('/')
	})

	return (
		<div>
			<AuthTitle>{t('registerForm.title')}</AuthTitle>

			<form onSubmit={form.handleSubmit(submitHandle)}>
				<Stack spacing={3}>
					<Controller
						name="password"
						control={form.control}
						defaultValue=""
						render={({field, fieldState}) => (
							<Input
								value={field.value}
								onChange={field.onChange}
								onBlur={field.onBlur}
								error={fieldState.error}
								type={InputTypes.PASSWORD}
								label="Password"
							/>
						)}
					/>
					<Controller
						name="passwordConfirm"
						control={form.control}
						defaultValue=""
						render={({field, fieldState}) => (
							<Input
								value={field.value}
								onChange={field.onChange}
								onBlur={field.onBlur}
								error={fieldState.error}
								type={InputTypes.PASSWORD}
								label="Password"
							/>
						)}
					/>

					<Button
						size="large"
						type="submit"
						color="primary"
						variant="contained"
						disabled={form.formState.isSubmitting}
						fullWidth
					>{t('resetPasswordForm.submit')}</Button>
				</Stack>
			</form>
		</div>
	);
};
