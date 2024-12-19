'use client';

import { Grid } from '@/_ui/Game/Grid';
import { GameData } from '@/_ui/Game/GameData';
import { GamePlayers } from '@/_ui/Game/GamePlayers';
import { Numbers } from '@/_ui/Game/Numbers';
import { useStore } from '@/_store';
import { GameActions } from '@/_ui/Game/GameActions';
import { getSocket } from '@/_services/socket';
import { EventReturnType } from '@/_store/slices/gameSlice';

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
