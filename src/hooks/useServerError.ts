import { useEffect, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { getErrorMessage } from 'utils';
import { ErrorResponse } from 'types';
import { useAPIError } from './useAPIError';

type UseServerErrorProps = {
    isError?: boolean,
    error?: FetchBaseQueryError | SerializedError | undefined
}

export const useServerError = ({ isError, error }: UseServerErrorProps): {
	message: string | undefined;
	setMessage: (message?: string) => void;
} => {
	const [message, setMessage] = useState<string>();
	const { addError } = useAPIError();

	useEffect(() => {
    if (isError && error) {
      const message = getErrorMessage(error as ErrorResponse);
	    addError({ message });
    }
  }, [error, isError, addError]);

	return { message, setMessage };
};
