'use client';

import { Grid } from '@/_ui/Game/Grid';
import { GameData } from '@/_ui/Game/GameData';
import { GamePlayers } from '@/_ui/Game/GamePlayers';
import { Numbers } from '@/_ui/Game/Numbers';
import { useStore } from '@/_store';
import { GameActions } from '@/_ui/Game/GameActions';
import { getSocket } from '@/_services/socket';
import { EventReturnType } from '@/_store/slices/gameSlice';
import { EndGame } from '@/_ui/EndGame';

export const Game = () => {
  const inputCell = useStore(state => state.inputCell);
  const inputNotes = useStore(state => state.inputNotes);
  const isNotesActive = useStore(state => state.isNotesActive);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;

    if (key >= '1' && key <= '9') {
      if (isNotesActive) {
        inputNotes(Number(key));
      } else {
        inputCell(Number(key));
      }
    }
  };

  // Listener for game state handling
  const socket = getSocket();

  socket?.on('inputCell', (data: EventReturnType) => {
    useStore.getState().updateGameState(data);
  });

  socket?.on('joinRoom', () => {
    useStore.getState().syncGameState();
  });

  socket?.on('syncGameState', (data: EventReturnType) => {
    useStore.getState().updateGameState(data);
  });

  const isGameOver = useStore(state => state.isGameOver);

  if (isGameOver) {
    return <EndGame />;
  } else {
    return (
      <>
        <div
          className={
            'hidden w-full flex-col items-center justify-center gap-2 rounded-lg bg-dark p-4 lg:flex lg:w-fit lg:gap-12'
          }
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className={'flex w-fit flex-col gap-2 md:flex-row md:gap-8'}>
            <Grid />
            <div className={'flex grow flex-col gap-2 md:gap-8'}>
              <GameData />
              <GameActions />
              <GamePlayers />
            </div>
          </div>
          <Numbers />
        </div>
        <div
          className={
            'hidden w-full flex-col items-center justify-center gap-2 rounded-lg bg-dark p-2 md:flex md:gap-12 lg:hidden'
          }
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className={'flex w-full flex-col gap-4 md:gap-4'}>
            <div className={'flex w-full gap-2'}>
              <GameData />
              <GameActions />
              <GamePlayers />
            </div>
            <Grid />
            <Numbers />
          </div>
        </div>
        <div
          className={
            'flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-dark p-2 md:hidden lg:gap-12'
          }
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className={'flex w-full flex-col gap-4 lg:flex-row lg:gap-8'}>
            <GameData />
            <Grid />
            <Numbers />
            <GameActions />
            <GamePlayers />
          </div>
        </div>
      </>
    );
  }
};
