// created by Artem
import { FC, ReactNode } from 'react';
import { Card as MuiCard, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import styled from 'styled-components';

type CardProps = {
  sx?: SxProps<Theme>;
  className?: string;
  children: ReactNode;
};
const CardComponent: FC<CardProps> = ({
  children,
  className,
  sx,
}) => {
  return (
		<MuiCard className={className} sx={sx}>
      {children}
		</MuiCard>
	);
};

export const Card = styled(CardComponent)`
  padding: 40px;
  box-shadow: 0 20px 30px 0 #7E7E7E0D;
  border-radius: 10px;
  width: calc(100% - 80px);
	
  @media (max-width:920px) {
    width: 100%;
    padding: 20px;
  }
`;
