import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Link, Stack, Typography } from '@mui/material';
import { Input } from 'shared';
import ROUTES from 'router/routes';
import { useLoginMutation } from 'services';
import { useServerError, useSetTokenToStorage } from 'hooks';
import { FormConfigItem, InputTypes, LoginFormValues } from "types";
import rules from './rules';
import { useTranslation } from 'react-i18next';
import GoogleImg from 'assets/images/icons/google-icon.svg';
import FacebookImg from 'assets/images/icons/facebook-icon.svg';
import { AuthButton, AuthDivider } from '../components';

const CONFIG: readonly FormConfigItem<'email' | 'password'>[] = [{
	name: 'email',
	label: 'loginForm.labelEmail',
	type: InputTypes.TEXT,
},
	{
		name: 'password',
		label: 'loginForm.labelPassword',
		type: InputTypes.PASSWORD,
	}] as const;

export const Form: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const form = useForm<LoginFormValues>({
    resolver: yupResolver(rules),
    defaultValues: {
	    email: '',
	    password: ''
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  const [login, { data: result, isError, error: serverError }] = useLoginMutation();

  const onSubmit = (data: LoginFormValues): void => {
    login(data);
  };

  useSetTokenToStorage({ result });

  useServerError({ isError, error: serverError });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {CONFIG.map(({ name, label, type }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            defaultValue=""
            render={({
              field: { onBlur, onChange, value }, fieldState: { error },
            }): JSX.Element => (
              <Input
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                label={t(label)}
                type={type}
              />
            )}
          />
        ))}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link component={RouterLink} variant="subtitle2" underline="hover" to={ROUTES.AUTH.FORGOT_PASSWORD}>
          Forgot password?
        </Link>
      </Stack>
	    <Button
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
        fullWidth
      >
        {t('loginForm.signin')}
	    </Button>

      <AuthDivider>{t('loginForm.Or_use_services')}</AuthDivider>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AuthButton icon={GoogleImg}>
            Sign up with Google
          </AuthButton>
        </Grid>
        <Grid item xs={6}>
          <AuthButton icon={FacebookImg}>
            Sign up with Facebook
          </AuthButton>
        </Grid>
        <Grid item xs={6}>
          <AuthButton icon={FacebookImg}>
            Sign up with Wallet
          </AuthButton>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: '30px' }}>
        <Grid item>
          <Typography>Don’t have an account?</Typography>
        </Grid>
        <Grid item>
          <AuthButton>{t('loginForm.signup')}</AuthButton>
        </Grid>
      </Grid>
    </form>
  );
};
