// CountdownTimerDisplay.tsx
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

interface CountdownTimerDisplayProps {
  isActive: boolean;
  initialDurationSeconds: number;
  onTimeUp?: () => void; // Optional: if you want to do something specific when time is up via UI
}

const CountdownTimerDisplay: React.FC<CountdownTimerDisplayProps> = ({
  isActive,
  initialDurationSeconds,
  onTimeUp,
}) => {
  const [remainingTime, setRemainingTime] = useState(initialDurationSeconds);

  useEffect(() => {
    // Reset timer when the call becomes active or initial duration changes
    if (isActive) {
      setRemainingTime(initialDurationSeconds);
    } else {
      // Optionally reset to initial if you want it to show full time when inactive
      // Or keep the last remaining time if call is paused (not a feature here)
      setRemainingTime(initialDurationSeconds); 
    }
  }, [isActive, initialDurationSeconds]);

  useEffect(() => {
    if (!isActive || remainingTime <= 0) {
      return; // Don't run interval if not active or time is already up
    }

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          if (onTimeUp) {
            onTimeUp();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, remainingTime, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingTime <= 60 && remainingTime > 0; // Less than or equal to 1 minute

  if (!isActive && remainingTime === initialDurationSeconds) { // Or some other condition to hide if not active
    return null; // Don't show timer if session is not active and timer is at full
  }

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center space-x-3 px-5 py-3 rounded-full shadow-2xl border transition-all duration-300
        ${
          isLowTime
            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white border-red-600 animate-pulse'
            : 'bg-white/80 backdrop-blur-lg text-gray-700 border-gray-200/80'
        }`}
    >
      {isLowTime ? (
        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
      ) : (
        <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
      )}
      <span className="text-lg sm:text-xl font-semibold tracking-wider">
        {formatTime(remainingTime)}
      </span>
      <span className={`text-xs uppercase ${isLowTime ? 'opacity-80' : 'text-gray-500'}`}>
        Remaining
      </span>
    </div>
  );
};

export default CountdownTimerDisplay;