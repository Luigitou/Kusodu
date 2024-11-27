import { DesktopSidebar } from '@/_ui/Sidebar/Desktop';
import { MobileSidebar } from '@/_ui/Sidebar/Mobile';
import { AiGameIcon, ChampionIcon, Home09Icon, ZapIcon } from '@/_icons';

type SidebarProps = {
  isMobile: boolean;
  close?: () => void;
};

const buttons = [
  { label: 'Accueil', href: '/', icon: <Home09Icon /> },
  { label: 'Jouer', href: '/game', icon: <AiGameIcon /> },
  { label: 'Duel', href: '/duel', icon: <ZapIcon /> },
  { label: 'Classé', href: '/ranked', icon: <ChampionIcon /> },
];

export function Sidebar({ isMobile, close }: SidebarProps) {
  if (isMobile) {
    return <MobileSidebar buttons={buttons} close={close} />;
  }
  return <DesktopSidebar buttons={buttons} />;
}
