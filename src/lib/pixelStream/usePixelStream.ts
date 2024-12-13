import { useState, useEffect, useCallback } from 'react';
import type { StreamState } from './types';

export function usePixelStream(url: string) {
  const [state, setState] = useState<StreamState>({
    isConnected: false,
    isLoading: true,
    error: null
  });

  const handleConnect = useCallback(() => {
    setState(prev => ({ ...prev, isConnected: true, isLoading: false }));
  }, []);

  const handleDisconnect = useCallback(() => {
    setState(prev => ({ ...prev, isConnected: false }));
  }, []);

  const handleError = useCallback((error: Error) => {
    setState(prev => ({ ...prev, error: error.message, isLoading: false }));
  }, []);

  useEffect(() => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // Initial connection check
    fetch(url, { method: 'HEAD' })
      .then(() => handleConnect())
      .catch(handleError);

    return () => {
      setState(prev => ({ ...prev, isConnected: false, isLoading: false }));
    };
  }, [url]);

  return state;
}