import { SinglePlayer } from '@/_ui/Game/GamePlayers/SinglePlayer';
import { Multiplayer } from '@/_ui/Game/GamePlayers/Multiplayer';
import { useStore } from '@/_store';

export const GamePlayers = () => {
  const players = useStore(state => state.players);

  console.log(players);

  return (
    <div
      className={
        'flex flex-col gap-4 rounded-lg bg-light p-2 text-sm md:items-center md:justify-center md:p-4'
      }
    >
      {players.length === 1 && <SinglePlayer />}
      {players.length > 1 && <Multiplayer />}
    </div>
  );
};
