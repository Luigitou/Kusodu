import { GameMenu } from '@/_ui/GameMenu';
import { GameMode } from '@/_types';

export default function Game() {
  return (
    <div
      className={
        'flex w-full items-center justify-center gap-8 rounded-lg bg-dark p-12'
      }
    >
      <GameMenu mode={GameMode.CLASSIC} />
    </div>
  );
}
