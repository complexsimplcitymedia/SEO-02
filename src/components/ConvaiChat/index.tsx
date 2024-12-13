import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, RotateCcw, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { convaiService } from '../../lib/convai';
import { useVoiceControl } from '../../hooks/useVoiceControl';
import { useInteractionLimit } from '../../hooks/useInteractionLimit';
import VoiceButton from './VoiceButton';
import AudioControls from './AudioControls';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message } from '../../types';

export default function ConvaiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [userText, setUserText] = useState("");
  const [npcText, setNpcText] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const finalizedUserText = useRef<string>("");
  const npcTextRef = useRef<string>("");

  const {
    isRecording,
    isTalking,
    error,
    startRecording,
    stopRecording,
    setIsTalking,
    setError
  } = useVoiceControl();

  const {
    interactionsLeft,
    isLimited,
    incrementInteraction
  } = useInteractionLimit();

  // Rest of the existing useEffect and handler functions...

  const handleVoiceButtonMouseDown = () => {
    if (isLimited) return;
    startRecording();
    incrementInteraction();
  };

  const handleVoiceButtonTouchStart = (e: React.TouchEvent) => {
    if (isLimited) return;
    e.preventDefault();
    startRecording();
    incrementInteraction();
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTalking || isLimited) return;

    const message = inputText.trim();
    setInputText('');
    addMessage(message, 'user');
    incrementInteraction();

    try {
      await convaiService.sendTextMessage(message);
      setError(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gray-900 rounded-xl shadow-xl w-96 mb-4 max-h-[90vh] flex flex-col landscape:max-h-[85vh]"
          >
            <div className="p-2 landscape:p-1 border-b border-gray-800 flex items-center justify-between shrink-0">
              <h3 className="text-lg landscape:text-base font-semibold text-white px-2">
                AI Assistant {!isLimited && `(${interactionsLeft} questions left)`}
              </h3>
              <div className="flex items-center space-x-2">
                <AudioControls
                  isMuted={isMuted}
                  volume={volume}
                  onVolumeChange={handleVolumeChange}
                  onToggleMute={handleToggleMute}
                />
                <button
                  onClick={handleResetSession}
                  disabled={isTalking || isResetting}
                  className="p-2 landscape:p-1 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                  title="Reset conversation"
                >
                  <RotateCcw className={`w-4 h-4 text-gray-400 ${isResetting ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {isLimited && (
              <div className="p-4 bg-yellow-500/10 text-yellow-400 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <p className="text-sm">
                  You've reached your limit of 5 questions for today. Limit resets every Friday.
                </p>
              </div>
            )}

            {error && (
              <div className="p-2 bg-red-500/10 text-red-400 text-sm flex items-center justify-between shrink-0">
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-xs bg-red-500/20 px-2 py-1 rounded hover:bg-red-500/30 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              <MessageList
                messages={messages}
                userText={userText}
                npcText={npcText}
                messagesEndRef={messagesEndRef}
              />
            </div>

            <div className="p-4 landscape:p-2 border-t border-gray-800 shrink-0">
              <div className="flex items-center space-x-2">
                <div
                  onMouseDown={handleVoiceButtonMouseDown}
                  onMouseUp={handleVoiceButtonMouseUp}
                  onMouseLeave={handleVoiceButtonMouseUp}
                  onTouchStart={handleVoiceButtonTouchStart}
                  onTouchEnd={handleVoiceButtonTouchEnd}
                >
                  <VoiceButton
                    isRecording={isRecording}
                    onClick={() => {}}
                    disabled={isTalking || isLimited}
                  />
                </div>
                <ChatInput
                  inputText={inputText}
                  setInputText={setInputText}
                  onSendMessage={handleSendMessage}
                  disabled={isTalking || isLimited}
                />
              </div>
              {(isRecording || isTalking) && (
                <div className="mt-2 text-sm text-gray-400 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>{isRecording ? 'Recording...' : 'AI Speaking...'}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Mic className="w-6 h-6" />
      </motion.button>
    </div>
  );
}