import React from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  isRecording: boolean;
  onSendMessage: () => void;
  onToggleRecording: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}

export default function ChatInput({
  inputText,
  setInputText,
  isRecording,
  onSendMessage,
  onToggleRecording,
  onKeyPress,
  disabled = false,
}: ChatInputProps) {
  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center space-x-2">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
          rows={1}
          disabled={disabled}
        />
        <button
          onClick={onToggleRecording}
          disabled={disabled}
          className={`p-2 rounded-lg transition-colors ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'
          } disabled:opacity-50`}
        >
          {isRecording ? (
            <MicOff className="w-5 h-5 text-white" />
          ) : (
            <Mic className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={onSendMessage}
          disabled={disabled || !inputText.trim()}
          className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}