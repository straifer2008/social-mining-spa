// created by Artem
import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Alert, Snackbar } from '@mui/material';
import { AlertColor } from '@mui/material/Alert/Alert';

type NotificationProps = {
	content: ReactNode;
	onClose: () => void;
	open: boolean;
	autoHideDuration?: number;
	severity?: AlertColor;
};
export const Notification: FC<NotificationProps> = ({
	content,
	onClose,
	open,
	autoHideDuration = 3000,
	severity = 'info'
}) => {
	const element = document.getElementById('portal-root');

	if (!element) return null;

	return createPortal((
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
				{content}
			</Alert>
		</Snackbar>
	), element);
};
