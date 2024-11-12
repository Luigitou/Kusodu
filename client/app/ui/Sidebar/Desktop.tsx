import { NavButtons } from '@/components';

type DesktopSidebarProps = {
  buttons: Array<{ label: string; href: string; icon: React.ReactNode }>;
};

export function DesktopSidebar({ buttons }: DesktopSidebarProps) {
  return (
    <nav
      className={
        'flex h-full w-full flex-col items-center justify-center gap-6'
      }
    >
      {buttons.map(button => (
        <NavButtons
          key={button.label}
          label={button.label}
          href={button.href}
          icon={button.icon}
        />
      ))}
    </nav>
  );
}
