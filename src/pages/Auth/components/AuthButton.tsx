// created by Artem
import { FC, ReactNode, ElementType } from 'react';
import { Button, ButtonProps } from '@mui/material';
import styled from 'styled-components';

type AuthButtonProps = {
  icon?: string;
  children?: ReactNode;
	to?: string;
	component?: ElementType;
} & ButtonProps;
export const AuthButton: FC<AuthButtonProps> = ({
	                                                onClick,
	                                                icon,
	                                                children,
	                                                variant = 'outlined',
	                                                fullWidth = true,
	                                                ...props
}) => {
  return (
    <Button variant={variant} onClick={onClick} fullWidth={fullWidth} {...props}>
      {icon && <Icon src={icon} alt="auth-icon" />}
      {children}
    </Button>
  );
};

const Icon = styled.img`
  margin: 0 20px 0 0;
  max-width: 30px;
`;
