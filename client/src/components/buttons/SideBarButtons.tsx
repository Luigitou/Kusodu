import { ReactElement } from 'react';

type SideBarButtonsProps = {
  name: string;
  icon: ReactElement;
};

export function SideBarButtons({ name, icon }: SideBarButtonsProps) {
  return (
    <button
      className={
        'flex bg-light w-full rounded-lg gap-4 p-3 items-center shadow-md font-bold hover:bg-primary'
      }
    >
      <span className={'ml-2 w-6 aspect-square'}>{icon}</span>
      <span className={''}>{name}</span>
    </button>
  );
}
