'use client';

import classNames from 'classnames';
import Link from 'next/link';

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
  return (
    <div
      className={classNames(
        'flex h-full w-full items-center justify-center rounded-lg border-2 border-transparent bg-light hover:border-primary',
      )}
    >
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
