import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type SideBarButtonsProps = {
  name: string;
  icon: ReactElement;
  link: string;
};

export function SideBarButtons({ name, icon, link }: SideBarButtonsProps) {
  return (
    <Link
      to={link}
      className={
        'flex bg-light w-full rounded-lg gap-4 p-3 items-center shadow-md font-bold hover:bg-primary'
      }
    >
      <span className={'ml-2 w-6 aspect-square'}>{icon}</span>
      <span className={''}>{name}</span>
    </Link>
  );
}
