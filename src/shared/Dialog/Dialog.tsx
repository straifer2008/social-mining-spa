// created by Artem
import { FC, ReactNode } from 'react';
import MuiDialog, { DialogProps } from '@mui/material/Dialog';
import { DialogContent, DialogTitle } from '@mui/material';
import Logo from 'assets/images/logo_small.svg';

type DialogComponentProps = {
	fullWidth?: boolean;
	maxWidth?: DialogProps['maxWidth'];
	open: boolean;
	handleClose?: () => any;
	title?: ReactNode;
	children?: ReactNode;
};
export const Dialog: FC<DialogComponentProps> = ({
	                                                 fullWidth,
	                                                 maxWidth = 'md',
	                                                 open,
	                                                 handleClose,
	                                                 title,
	                                                 children

}) => {
	return (
		<MuiDialog
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			open={open}
			onClose={handleClose}
		>
			<img src={Logo} width={40} style={{ marginLeft: 24, marginTop: 40, marginBottom: 15 }} alt="logo"/>
			{title && <DialogTitle align="left">{title}</DialogTitle>}

			<DialogContent>
				{children}
			</DialogContent>
		</MuiDialog>
	);
};
