// created by Artem
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthTitle } from '../components';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'shared';
import { InputTypes } from 'types';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ROUTES from 'router/routes';
import { roles } from './rules';
import { useForgotPasswordMutation } from 'services';
import { useCommonSuccess, useServerError } from '../../../hooks';

type ForgotPasswordProps = {};
export const ForgotPassword: FC<ForgotPasswordProps> = () => {
	const { t } = useTranslation();
	const [onForgot, { isError, error, isSuccess, data }] = useForgotPasswordMutation();
	const form = useForm<{ email: string }>({
		resolver: yupResolver(roles),
		defaultValues: { email: '' }
	});

	useServerError({ isError, error });
	useCommonSuccess({
		message: data?.message,
		condition: isSuccess,
	})

	const submitHandle = (values: { email: string }) => onForgot(values);

	return (
		<div>
			<AuthTitle>{t('resetPasswordForm.title')}</AuthTitle>

			<form onSubmit={form.handleSubmit(submitHandle)}>
				<Stack sx={{ mb: 3 }}>
					<Controller
						name="email"
						control={form.control}
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
					disabled={form.formState.isSubmitting}
					fullWidth
				>{t('resetPasswordForm.submit')}</Button>
			</form>

			<Stack justifyContent="flex-end" flexDirection="row" sx={{ mt: 2, mb: 3 }}>
				<Link to={`${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGIN}`}>
					{t('resetPasswordForm.lonkLogin')}
				</Link>
			</Stack>
		</div>
	);
};
