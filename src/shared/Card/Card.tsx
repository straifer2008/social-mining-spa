// created by Artem
import { FC, ReactNode } from 'react';
import { Card as MuiCard, Theme, styled } from '@mui/material';
import { SxProps } from '@mui/system';

type CardProps = {
  sx?: SxProps<Theme>;
  className?: string;
  children: ReactNode;
};
export const Card: FC<CardProps> = ({
  children,
  className,
  sx,
}) => {
  return (
		<Wrap className={className} sx={sx}>
      {children}
		</Wrap>
	);
};

const Wrap = styled(MuiCard)`
  padding: 40px;
  box-shadow: 0 20px 30px 0 #7E7E7E0D;
  border-radius: 10px;
  width: calc(100% - 80px);
	
  @media (max-width:920px) {
    width: 100%;
    padding: 20px;
  }
`;
