import { useCallback, useState } from 'react';

export default function useCancelToken() {
  const [controller, setController] = useState(new AbortController());

  const newCancelToken = useCallback(() => {
    const newController = new AbortController();
    setController(newController);
    return newController;
  }, []);

  const handleCancel = useCallback(() => controller.abort(), [controller]);

  const isAbortError = (error: any) => error.name === 'AbortError';

  return { handleCancel, newCancelToken, isAbortError };
}
