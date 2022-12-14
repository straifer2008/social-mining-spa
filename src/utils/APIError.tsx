import { createContext, FC, ReactNode, useCallback, useState } from 'react'
import { Notification } from 'shared';
import { AlertColor } from '@mui/material/Alert/Alert';

interface APIErrorI {
	message: string;
	severity?: AlertColor;
}

interface APIErrorContextI {
	error: APIErrorI | null;
	addError: (data: APIErrorI) => void;
	removeError: () => void;
}

export const APIErrorContext = createContext<APIErrorContextI>({
	error: null,
	addError: () => {},
	removeError: () => {}
});

const APIErrorProvider: FC<{ children?: ReactNode}> = ({ children }) => {
	const [error, setError] = useState<APIErrorI | null>(null);

	const removeError = () => setError(null);

	const addError = (newError: APIErrorI) => setError(newError);

	const contextValue = {
		error,
		addError: useCallback((newError: APIErrorI) => addError(newError), []),
		removeError: useCallback(() => removeError(), [])
	};

	return (
		<APIErrorContext.Provider value={contextValue}>
			{children}

			<Notification
				onClose={removeError}
				open={!!error}
				content={error?.message}
				severity={error?.severity}
			/>
		</APIErrorContext.Provider>
	);
}

export default APIErrorProvider;
