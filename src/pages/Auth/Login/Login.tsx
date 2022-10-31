// created by Artem
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from './Form';
import { AuthTitle } from '../components';

export const Login: FC<{className?: string}> = ({ className }) => {
  const { t } = useTranslation();

	return (
		<div className={className}>
      <AuthTitle>{t('loginForm.title')}</AuthTitle>
      <Form />
    </div>
	);
};
