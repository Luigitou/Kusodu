import { DesktopSidebar } from '@/_ui/Sidebar/Desktop';
import { MobileSidebar } from '@/_ui/Sidebar/Mobile';
import { AiGameIcon, ChampionIcon, Home09Icon, ZapIcon } from '@/_icons';

type SidebarProps = {
  isMobile: boolean;
  close?: () => void;
};

const buttons = [
  { label: 'Accueil', href: '/', icon: <Home09Icon />, active: true },
  { label: 'Jouer', href: '/game', icon: <AiGameIcon />, active: true },
  { label: 'Duel', href: '/duel', icon: <ZapIcon />, active: false },
  { label: 'Classé', href: '/ranked', icon: <ChampionIcon />, active: false },
];

export function Sidebar({ isMobile, close }: SidebarProps) {
  if (isMobile) {
    return <MobileSidebar buttons={buttons} close={close} />;
  }
  return <DesktopSidebar buttons={buttons} />;
}
