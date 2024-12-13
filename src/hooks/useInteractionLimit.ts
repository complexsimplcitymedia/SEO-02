import { useState, useEffect } from 'react';

const MAX_INTERACTIONS = 5;
const INTERACTION_RESET_DAY = 5; // Friday
const STORAGE_KEY = 'ai_interaction_limit';

interface InteractionData {
  count: number;
  lastReset: string;
}

export function useInteractionLimit() {
  const [interactionsLeft, setInteractionsLeft] = useState<number>(MAX_INTERACTIONS);
  const [isLimited, setIsLimited] = useState(false);

  useEffect(() => {
    checkAndResetLimit();
  }, []);

  const checkAndResetLimit = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const now = new Date();
    const currentDay = now.getDay();

    if (stored) {
      const data: InteractionData = JSON.parse(stored);
      const lastReset = new Date(data.lastReset);
      
      // Reset on Friday if not already reset this Friday
      if (currentDay === INTERACTION_RESET_DAY && 
          (lastReset.getDay() !== INTERACTION_RESET_DAY || 
           lastReset.getDate() !== now.getDate())) {
        resetLimit();
      } else {
        setInteractionsLeft(MAX_INTERACTIONS - data.count);
        setIsLimited(data.count >= MAX_INTERACTIONS);
      }
    } else {
      resetLimit();
    }
  };

  const resetLimit = () => {
    const data: InteractionData = {
      count: 0,
      lastReset: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setInteractionsLeft(MAX_INTERACTIONS);
    setIsLimited(false);
  };

  const incrementInteraction = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: InteractionData = JSON.parse(stored);
      const newCount = data.count + 1;
      const newData: InteractionData = {
        ...data,
        count: newCount
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setInteractionsLeft(MAX_INTERACTIONS - newCount);
      setIsLimited(newCount >= MAX_INTERACTIONS);
    }
  };

  return {
    interactionsLeft,
    isLimited,
    incrementInteraction
  };
}