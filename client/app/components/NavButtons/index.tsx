'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

type NavButtonsProps = {
  label: string;
  href: string;
  icon: React.ReactNode;
  className?: string;
  click?: () => void;
};

export function NavButtons({
  label,
  href,
  icon,
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
          ' border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary',
        currentLink && 'border-l-4 border-l-primary',
        className,
      )}
    >
      <span className={''}>{icon}</span>
      <span className={'text-lg'}>{label}</span>
    </Link>
  );
}
