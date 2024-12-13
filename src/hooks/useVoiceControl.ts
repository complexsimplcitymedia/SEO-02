import { useState, useEffect, useCallback } from 'react';
import { convaiService } from '../lib/convai';

export function useVoiceControl() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startRecording = useCallback(async () => {
    if (isTalking) return;
    
    try {
      await convaiService.startAudioInput();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      console.error('Failed to start recording:', err);
      setError('Failed to access microphone');
    }
  }, [isTalking]);

  const stopRecording = useCallback(() => {
    if (isRecording) {
      convaiService.stopAudioInput();
      setIsRecording(false);
    }
  }, [isRecording]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.code === 'KeyT' && !isRecording && !isTalking) {
        event.preventDefault();
        await startRecording();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'KeyT' && isRecording) {
        event.preventDefault();
        stopRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRecording, isTalking, startRecording, stopRecording]);

  return {
    isRecording,
    isTalking,
    error,
    startRecording,
    stopRecording,
    setIsTalking,
    setError
  };
}