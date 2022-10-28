// created by Artem
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from './Form';
import styled from 'styled-components';

const LoginComponent: FC<{className?: string}> = ({ className }) => {
  const { t } = useTranslation();

	return (
		<div className={className}>
      <h5 className="auth-form--title">{t('loginForm.title')}</h5>
      <Form />
    </div>
	);
};

export const Login = styled(LoginComponent)`
  .auth-form--title {
    text-align: center;
    font-family: Poppins;
    font-weight: 500;
    font-size: 40px;
    line-height: 141%;
    color: #0E1D40;
	  margin-bottom: 30px;
  }
`;
