import { GameMenu } from '@/ui/GameMenu';
import { GameMode } from '@/types';

export default function Game() {
  return (
    <div
      className={
        'flex items-center justify-center gap-8 rounded-lg bg-dark p-12'
      }
    >
      <GameMenu mode={GameMode.CLASSIC} />
    </div>
  );
}