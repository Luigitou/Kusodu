import { NavButtons } from '@/_components';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { UserIcon } from '@/_icons';

type MobileSidebarProps = {
  buttons: Array<{
    label: string;
    href: string;
    icon: React.ReactNode;
    active?: boolean;
  }>;
  close?: () => void;
};

export function MobileSidebar({ buttons, close }: MobileSidebarProps) {
  return (
    <div
      className={
        'absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-dark'
      }
    >
      <div
        className={'flex w-full flex-col items-center justify-center gap-6 p-4'}
      >
        <button
          className={
            'absolute top-4 flex gap-2 rounded-lg border-2 border-transparent bg-light p-4 hover:border-red-500'
          }
          onClick={close}
        >
          <span className={'text-red-500'}>
            <CloseIcon />
          </span>
          Close
        </button>
        {buttons.map(button => (
          <NavButtons
            key={button.label}
            label={button.label}
            href={button.href}
            icon={button.icon}
            active={button.active}
            className={'justify-center'}
            click={close}
          />
        ))}
        <span className={'h-[2px] w-full rounded-full bg-primary'}></span>
        <NavButtons
          label={'Se connecter'}
          href={'/auth'}
          icon={<UserIcon />}
          active={true}
          className={'justify-center'}
          click={close}
        />
      </div>
    </div>
  );
}
