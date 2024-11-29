import { useStore } from '@/_store';
import { useEffect } from 'react';

export const GameData = () => {
  const timer = useStore(state => state.timer);
  const lives = useStore(state => state.lives);
  const timerIsPaused = useStore(state => state.timerIsPaused);
  const setTimerIsPaused = useStore(state => state.setTimerIsPaused);

  useEffect(() => {
    useStore.getState().startTimer();

    return () => {
      useStore.getState().stopTimer();
    };
  }, []);

  const handlePause = () => {
    setTimerIsPaused(!timerIsPaused);
  };

  return (
    <div
      className={
        'flex flex-col items-center justify-center gap-2 rounded-lg bg-light p-4'
      }
    >
      <button onClick={handlePause}>Pause</button>
      <span>{formatTime(timer)}</span>
      <span>{lives}</span>
    </div>
  );
};

const formatTime = (seconds: number | null) => {
  if (!seconds) return '00:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const paddedHours = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const paddedMinutes = `${minutes.toString().padStart(2, '0')}`;
  const paddedSeconds = `${secs.toString().padStart(2, '0')}`;

  return `${paddedHours}${paddedMinutes}:${paddedSeconds}`;
};
