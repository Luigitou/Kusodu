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
        'flex items-center justify-center rounded-lg border-2 border-transparent bg-light p-2 hover:border-primary',
      )}
    >
      {!href && (
        <button onClick={click} aria-label={label}>
          {icon}
        </button>
      )}
      {href && <Link href={href}>{icon}</Link>}
    </div>
  );
}
