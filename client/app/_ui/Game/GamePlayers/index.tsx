import { SinglePlayer } from '@/_ui/Game/GamePlayers/SinglePlayer';
import { Multiplayer } from '@/_ui/Game/GamePlayers/Multiplayer';

export const GamePlayers = () => {
  const players = [
    {
      name: 'Louis',
    },
  ];

  return (
    <div className={'flex flex-col gap-4 rounded-lg bg-light p-4 text-sm'}>
      {players.length === 1 && <SinglePlayer />}
      {players.length > 1 && <Multiplayer />}
    </div>
  );
};
