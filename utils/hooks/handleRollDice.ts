import { useState } from "react";

interface UseRollDiceOptions {
  onRoll?: (roll: number) => void;
  animationDuration?: number;
}

export const useRollDice = ({ onRoll, animationDuration = 500 }: UseRollDiceOptions = {}) => {
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    let count = 0;
    
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      
      if (count > 10) {
        clearInterval(intervalId);
        const finalRoll = 6
        // const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceRoll(finalRoll);
        
        if (onRoll) {
          onRoll(finalRoll);
        }
        
        setIsRolling(false);
      }
    }, animationDuration / 10);
  };

  return {
    diceRoll,
    isRolling,
    rollDice,
    setDiceRoll,
  };
};