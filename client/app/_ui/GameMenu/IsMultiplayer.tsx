import classNames from 'classnames';
import { useStore } from '@/_store';

type IsMultiplayerProps = {
  isMultiplayer: boolean;
  setIsMultiplayer: (isMultiplayer: boolean) => void;
};

export const IsMultiplayer = ({
  isMultiplayer,
  setIsMultiplayer,
}: IsMultiplayerProps) => {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  return (
    <div className={'flex w-full flex-col items-center justify-center gap-4'}>
      <span className={''}>Multijoueur</span>
      <div className={'flex gap-4'}>
        <button
          onClick={() => setIsMultiplayer(true)}
          className={classNames(
            'relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary',
            isMultiplayer &&
              'text-primary ring-4 ring-primary hover:border-transparent',
            !isAuthenticated &&
              'cursor-not-allowed border-transparent text-gray-500 hover:border-transparent',
          )}
          disabled={!isAuthenticated}
        >
          Oui
        </button>
        <button
          onClick={() => setIsMultiplayer(false)}
          className={classNames(
            'relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary',
            !isMultiplayer &&
              'text-primary ring-4 ring-primary hover:border-transparent',
          )}
        >
          Non
        </button>
      </div>
    </div>
  );
};
