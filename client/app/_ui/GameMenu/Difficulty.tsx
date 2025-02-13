'use client';

import { AvailableDifficulty } from '@/_types';
import classNames from 'classnames';

const difficultyOptions = [
  {
    label: 'Facile',
    value: AvailableDifficulty.EASY,
  },
  {
    label: 'Moyen',
    value: AvailableDifficulty.MEDIUM,
  },
  {
    label: 'Difficile',
    value: AvailableDifficulty.HARD,
  },
  {
    label: 'Extreme',
    value: AvailableDifficulty.INSANE,
  },
];

type DifficultyProps = {
  difficulty: AvailableDifficulty;
  setDifficulty: (difficulty: AvailableDifficulty) => void;
};

export const Difficulty = ({ difficulty, setDifficulty }: DifficultyProps) => {
  return (
    <div className={'flex w-full flex-col items-center justify-center gap-4'}>
      <span className={''}>Difficulté</span>
      <div className={'grid grid-cols-2 gap-4 md:flex md:gap-4'}>
        {difficultyOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setDifficulty(option.value)}
            className={classNames(
              'relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary',
              difficulty === option.value &&
                'text-primary ring-4 ring-primary hover:border-transparent',
                option.value === AvailableDifficulty.INSANE &&
                  'cursor-not-allowed border-transparent text-gray-500 hover:border-transparent',
            )}
            disabled={option.value === AvailableDifficulty.INSANE}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
