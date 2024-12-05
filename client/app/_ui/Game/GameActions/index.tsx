import classNames from 'classnames';
import {
  ArrowTurnBackwardIcon,
  EraserIcon,
  Logout05Icon,
  PencilEdit01Icon,
} from '@/_icons';

const classnames = {
  wrapper: 'flex gap-4 w-full',
  button:
    'flex items-center gap-2 rounded-lg border-2 border-transparent bg-dark p-4 px-4 hover:border-primary w-1/2',
};

export function GameActions() {
  return (
    <div className={'flex flex-col gap-4 rounded-lg bg-light p-4 text-sm'}>
      <div className={classNames(classnames.wrapper)}>
        <button className={classNames(classnames.button)}>
          <ArrowTurnBackwardIcon />
          Annuler
        </button>
        <button className={classNames(classnames.button)}>
          <EraserIcon />
          Effacer
        </button>
      </div>
      <div className={classNames(classnames.wrapper)}>
        <button className={classNames(classnames.button)}>
          <PencilEdit01Icon />
          Notes
        </button>
        <button
          className={classNames(classnames.button, 'hover:border-red-500')}
        >
          <Logout05Icon />
          Quitter
        </button>
      </div>
    </div>
  );
}
