import { DesktopSidebar } from '@/ui/Sidebar/Desktop';
import { MobileSidebar } from '@/ui/Sidebar/Mobile';
import { AiGameIcon, ChampionIcon, ZapIcon } from '@/icons';

type SidebarProps = {
  isMobile: boolean;
};

const buttons = [
  { label: 'Jouer', href: '/', icon: <AiGameIcon /> },
  { label: 'Duel', href: '/duel', icon: <ZapIcon /> },
  { label: 'Classé', href: '/:id', icon: <ChampionIcon /> },
];

export function Sidebar({ isMobile }: SidebarProps) {
  if (isMobile) {
    return <MobileSidebar />;
  }
  return <DesktopSidebar buttons={buttons} />;
}
