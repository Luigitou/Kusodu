'use client';

import { Grid } from '@/_ui/Game/Grid';
import { GameData } from '@/_ui/Game/GameData';
import { GamePlayers } from '@/_ui/Game/GamePlayers';
import { Numbers } from '@/_ui/Game/Numbers';
import { useEffect } from 'react';
import { useStore } from '@/_store';
import { GameActions } from '@/_ui/Game/GameActions';

export const Game = () => {
  const setupGame = useStore(state => state.setupGame);
  const inputCell = useStore(state => state.inputCell);

  useEffect(() => {
    setupGame();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;
    console.log(key);

    if (key >= '1' && key <= '9') {
      inputCell(Number(key));
    }
  };

  return (
    <div
      className={
        'm-12 flex flex-col items-center justify-center gap-12 rounded-lg bg-dark p-12'
      }
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={'flex w-full gap-8'}>
        <Grid />
        <div className={'flex grow flex-col gap-8'}>
          <GameData />
          <GameActions />
          <GamePlayers />
        </div>
      </div>
      <Numbers />
    </div>
  );
};
