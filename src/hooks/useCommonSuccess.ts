import { useEffect } from 'react';
import { useAPIError } from './useAPIError';

type UseCommonSuccessProps = {
  message: string | undefined,
  callback?: () => void,
  condition?: boolean,
}

export const useCommonSuccess = ({
  message,
  callback,
  condition = true,
}: UseCommonSuccessProps): void => {
	const { addError } = useAPIError();

  useEffect(() => {
    if (message && condition) {
	    addError({ message, severity: 'success' });
      if (callback) {
        callback();
      }
    }
  }, [message, condition, addError, callback]);
};
