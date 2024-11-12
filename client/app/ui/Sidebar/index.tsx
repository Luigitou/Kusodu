import { DesktopSidebar } from '@/ui/Sidebar/Desktop';
import { MobileSidebar } from '@/ui/Sidebar/Mobile';
import { AiGameIcon, ChampionIcon, Home09Icon, ZapIcon } from '@/icons';

type SidebarProps = {
  isMobile: boolean;
  close?: () => void;
};

const buttons = [
  { label: 'Accueil', href: '/', icon: <Home09Icon /> },
  { label: 'Jouer', href: '/game', icon: <AiGameIcon /> },
  { label: 'Duel', href: '/duel', icon: <ZapIcon /> },
  { label: 'Classé', href: '/:id', icon: <ChampionIcon /> },
];

export function Sidebar({ isMobile, close }: SidebarProps) {
  if (isMobile) {
    return <MobileSidebar buttons={buttons} close={close} />;
  }
  return <DesktopSidebar buttons={buttons} />;
}
