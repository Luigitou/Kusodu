'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderButtonsProps = {
  label: string;
  icon: React.ReactNode;
  click?: () => void;
  href?: string;
};

export function HeaderButtons({
  label,
  icon,
  click,
  href,
}: HeaderButtonsProps) {
  const currentPath = usePathname();

  return (
    <div
      className={classNames(
        'relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border-2 border-transparent bg-light hover:border-primary',
      )}
    >
      <span
        className={classNames(
          'absolute bottom-0 left-0 h-1 w-full bg-primary',
          href && currentPath !== href && 'hidden',
        )}
      ></span>
      {!href && (
        <button
          className={'h-full w-full p-2'}
          onClick={click}
          aria-label={label}
        >
          {icon}
        </button>
      )}
      {href && (
        <Link href={href} className={'p-2'}>
          {icon}
        </Link>
      )}
    </div>
  );
}
