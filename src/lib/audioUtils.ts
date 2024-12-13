export async function initializeAudio(): Promise<MediaStream | null> {
  if (!window.isSecureContext) {
    throw new Error('Audio capture requires a secure HTTPS connection');
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 48000,
        channelCount: 2
      }
    });
    return stream;
  } catch (error) {
    console.error('Failed to initialize audio:', error);
    return null;
  }
}

export function stopAudioStream(stream: MediaStream | null) {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

export async function checkAudioPermissions(): Promise<boolean> {
  if (!window.isSecureContext) {
    return false;
  }

  try {
    const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
    return result.state === 'granted';
  } catch (error) {
    console.error('Failed to check audio permissions:', error);
    return false;
  }
}