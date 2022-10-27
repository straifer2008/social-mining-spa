import { useEffect, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { getErrorMessage } from 'utils';
import { ErrorResponse } from 'types';

type UseServerErrorProps = {
    isError?: boolean,
    error?: FetchBaseQueryError | SerializedError | undefined
}

export const useServerError = ({ isError, error }: UseServerErrorProps): {
	message: string | undefined;
	setMessage: (message?: string) => void;
} => {
	const [message, setMessage] = useState<string>();

	useEffect(() => {
    if (isError && error) {
      const message = getErrorMessage(error as ErrorResponse);
	    setMessage(message);
    }
  }, [error, isError]);

	return { message, setMessage };
};
