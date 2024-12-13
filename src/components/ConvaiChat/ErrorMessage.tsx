import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center p-4 bg-red-500/10 rounded-lg">
      <div className="flex items-center space-x-2 text-red-400">
        <AlertCircle className="w-5 h-5" />
        <span>{message}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3 py-1 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}