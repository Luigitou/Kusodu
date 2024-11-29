import { GameMenu } from '@/_ui/GameMenu';
import { GameMode } from '@/_types';

export default function Ranked() {
  return (
    <div
      className={
        'flex items-center justify-center gap-8 rounded-lg bg-dark p-12'
      }
    >
      <GameMenu mode={GameMode.RANKED} />
    </div>
  );
}
