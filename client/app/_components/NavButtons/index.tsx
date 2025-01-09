'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

type NavButtonsProps = {
  label: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  className?: string;
  click?: () => void;
};

export function NavButtons({
  label,
  href,
  icon,
  active,
  className,
  click,
}: NavButtonsProps) {
  const currentLink = usePathname() === href;

  return (
    <Link
      href={href}
      onClick={click}
      className={classNames(
        'flex w-full items-center justify-start gap-3 rounded-lg border-2 border-black' +
          ' relative overflow-hidden border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary',
        className,
        !active && 'pointer-events-none opacity-50',
      )}
    >
      <span
        className={classNames(
          'absolute left-0 top-0 h-full w-2 bg-primary',
          !currentLink && 'hidden',
        )}
      ></span>
      <span className={''}>{icon}</span>
      <span className={'text-lg'}>{label}</span>
    </Link>
  );
}
