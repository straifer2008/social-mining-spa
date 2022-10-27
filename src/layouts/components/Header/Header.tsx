// created by Artem
import { FC, ReactNode } from 'react';
import { HeaderWrap } from './HeaderStyles';

type HeaderProps = {
	children: ReactNode;
};
export const Header: FC<HeaderProps> = ({ children }) => {
	return (
		<HeaderWrap>
			{children}
		</HeaderWrap>
	);
};
