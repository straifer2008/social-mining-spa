// created by Artem
import { FC, MouseEventHandler, ReactNode } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';

type AuthButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: string;
  children?: ReactNode;
};
export const AuthButton: FC<AuthButtonProps> = ({ onClick, icon, children, ...props }) => {
  return (
    <Button variant="outlined" onClick={onClick} fullWidth {...props}>
      {icon && <Icon src={icon} alt="auth-icon" />}
      {children}
    </Button>
  );
};

const Icon = styled.img`
  margin: 0 20px 0 10px;
  max-width: 30px;
`;
