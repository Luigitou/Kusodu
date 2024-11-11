'use client';

import Link from 'next/link';

type NavButtonsProps = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export function NavButtons({ label, href, icon }: NavButtonsProps) {
  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={
        'flex w-full items-center justify-start gap-3 rounded-lg border-2 border-black' +
        ' border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary'
      }
    >
      <span className={''}>{icon}</span>
      <span className={'text-lg'}>{label}</span>
    </Link>
  );
}
