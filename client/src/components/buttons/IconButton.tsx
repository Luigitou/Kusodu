import { ReactElement } from 'react';

type IconButtonProps = {
  icon: ReactElement;
  name: string;
};

export function IconButton({ name, icon }: IconButtonProps) {
  return (
    <button
      className={'aspect-square bg-light p-2 flex rounded-lg hover:bg-primary'}
      aria-label={name}
    >
      <span className={'w-5 aspect-square'}>{icon}</span>
    </button>
  );
}
