import { useStore } from '@/_store';
import { useEffect } from 'react';
import {
  HearthIcon,
  HearthOutlineIcon,
  PauseCircleIcon,
  PlayIcon,
} from '@/_icons';

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
        'flex w-full flex-row items-center justify-center gap-4 rounded-lg bg-light p-2 md:flex-col md:p-4'
      }
    >
      <button
        className={
          'flex w-1/3 items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-dark p-2 px-4 shadow-xl hover:border-primary md:w-full'
        }
        onClick={handlePause}
      >
        <span className={''}>
          {timerIsPaused ? <PlayIcon /> : <PauseCircleIcon />}
        </span>
        <span className={'hidden md:block'}>
          {timerIsPaused ? 'Jouer' : 'Pause'}
        </span>
      </button>
      <span
        className={
          'flex w-1/3 items-center justify-center rounded-lg bg-dark p-2 text-xl shadow-xl md:w-full'
        }
      >
        {formatTime(timer)}
      </span>
      <div
        className={
          'flex w-1/3 items-center justify-center rounded-lg bg-dark p-2 shadow-xl md:w-full md:gap-2'
        }
      >
        {Array.from({ length: 3 }, (_, i) => (
          <span
            key={i}
            className={
              'bg-gradient-to-b from-primary to-light bg-clip-text text-transparent'
            }
          >
            {i < lives! ? (
              <span className={''}>
                <HearthIcon />
              </span>
            ) : (
              <span className={''}>
                <HearthOutlineIcon />
              </span>
            )}
          </span>
        ))}
      </div>
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
