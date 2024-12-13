export interface PixelStreamConfig {
  url: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export interface StreamControls {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export interface StreamState {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}