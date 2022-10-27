// created by Artem
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from './Form';

export const Register: FC = () => {
	const { t } = useTranslation();

	return (
		<div>
			<h5 className="auth-form--title">{t('registerForm.title')}</h5>

			<Form />
		</div>
	);
};

