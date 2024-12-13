import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { convaiService } from '../lib/convai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ConvaiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userText, setUserText] = useState("");
  const [npcText, setNpcText] = useState("");
  const [keyPressed, setKeyPressed] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const finalizedUserText = useRef<string>("");
  const npcTextRef = useRef<string>("");

  useEffect(() => {
    const initializeConvai = async () => {
      try {
        await convaiService.initialize();
        await convaiService.startSession();
        setIsInitialized(true);

        convaiService.onResponse((response: any) => {
          if (response.hasUserQuery()) {
            const transcript = response.getUserQuery();
            const isFinal = transcript.getIsFinal();
            
            if (isFinal) {
              finalizedUserText.current += " " + transcript.getTextData();
              setUserText(finalizedUserText.current);
              addMessage(transcript.getTextData(), 'user');
            } else if (transcript) {
              setUserText(finalizedUserText.current + transcript.getTextData());
            }
          }
          
          if (response.hasAudioResponse()) {
            const audioResponse = response.getAudioResponse();
            npcTextRef.current += " " + audioResponse.getTextData();
            setNpcText(npcTextRef.current);
            addMessage(audioResponse.getTextData(), 'ai');
          }
        });

        convaiService.onError((error) => {
          console.error('Convai error:', error);
        });
      } catch (error) {
        console.error('Failed to initialize Convai:', error);
      }
    };

    if (!isInitialized) {
      initializeConvai();
    }

    // Set up keyboard event listeners
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "KeyT" && !keyPressed && isOpen) {
        setKeyPressed(true);
        finalizedUserText.current = "";
        npcTextRef.current = "";
        setUserText("");
        setNpcText("");
        convaiService.startAudioInput();
        setIsRecording(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "KeyT" && keyPressed) {
        setKeyPressed(false);
        convaiService.stopAudioInput();
        setIsRecording(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      if (isInitialized) {
        convaiService.cleanup();
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isInitialized, keyPressed, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, sender: 'user' | 'ai') => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const message = inputText.trim();
    setInputText('');
    addMessage(message, 'user');
    finalizedUserText.current = message;
    setUserText(message);

    try {
      await convaiService.sendTextMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      convaiService.stopAudioInput();
      setIsTalking(false);
    } else {
      convaiService.startAudioInput();
      setIsTalking(true);
      finalizedUserText.current = "";
      npcTextRef.current = "";
      setUserText("");
      setNpcText("");
    }
    setIsRecording(!isRecording);
  };

  const handleTextKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
            className="bg-gray-900 rounded-xl shadow-xl w-96 mb-4"
          >
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Press 'T' to talk</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {(userText || npcText) && (
                <div className="text-sm text-gray-400 italic">
                  {userText && <div>You: {userText}</div>}
                  {npcText && <div>Assistant: {npcText}</div>}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleTextKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                />
                <button
                  onClick={toggleRecording}
                  className={`p-2 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-5 h-5 text-white" />
                  ) : (
                    <Mic className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Mic className="w-6 h-6" />
      </button>
    </div>
  );
}