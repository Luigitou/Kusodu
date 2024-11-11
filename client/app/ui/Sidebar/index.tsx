import { NavButtons } from '@/components';
import { AiGameIcon, ChampionIcon, ZapIcon } from '@/icons';

export function Sidebar() {
  return (
    <nav
      className={
        'flex h-full w-full flex-col items-center justify-center gap-6'
      }
    >
      <NavButtons label={'Jouer'} href={'/'} icon={<AiGameIcon />} />
      <NavButtons label={'Duel'} href={'/'} icon={<ZapIcon />} />
      <NavButtons label={'Classé'} href={'/'} icon={<ChampionIcon />} />
    </nav>
  );
}
