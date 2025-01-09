'use client';

import { AvailableDifficulty, GameMode } from '../../_types';
import { Difficulty } from '@/_ui/GameMenu/Difficulty';
import { useEffect, useState } from 'react';
import { useStore } from '../../_store';
import { getGameGridLoggedService, getGameGridService } from '@/_services/game';
import { useRouter } from 'next/navigation';
import { IsMultiplayer } from '@/_ui/GameMenu/IsMultiplayer';

type GameMenuProps = {
  mode: GameMode;
};

export const GameMenu = ({ mode }: GameMenuProps) => {
  const [difficulty, setDifficulty] = useState<AvailableDifficulty>(
    AvailableDifficulty.MEDIUM,
  );
  const [localIsMultiplayer, setLocalIsMultiplayer] = useState<boolean>(false);
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const setGrid = useStore(state => state.setGrid);
  const setupGame = useStore(state => state.setupGame);
  const setIsMultiplayer = useStore(state => state.setIsMultiplayer);
  const router = useRouter();
  const resetGame = useStore(state => state.resetGame);

  const handleStartGame = async () => {
    let grid;
    if (isAuthenticated) {
      grid = await getGameGridLoggedService(difficulty);
    } else {
      grid = await getGameGridService(difficulty);
    }
    setGrid(grid);
    setIsMultiplayer(localIsMultiplayer);
    const room = await setupGame();
    router.push(`/lobby/${room.roomId}`);
  };

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className={'flex w-full flex-col items-center gap-12'}>
      <span className={'flex flex-col gap-2 text-center text-xl'}>
        <h3>{mode.toUpperCase()}</h3>
        <h2 className={'flex items-center justify-center text-xl'}>
          Configuration de la partie
        </h2>
      </span>
      <div className={'w-full'}>
        <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
      </div>
      <div className={'w-full'}>
        <IsMultiplayer
          isMultiplayer={localIsMultiplayer}
          setIsMultiplayer={setLocalIsMultiplayer}
        />
      </div>
      <button
        className={
          'flex w-fit items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary'
        }
        onClick={handleStartGame}
      >
        Commencer la partie
      </button>
    </div>
  );
};
