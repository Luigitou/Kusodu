import classNames from 'classnames';
import {
  ArrowTurnBackwardIcon,
  EraserIcon,
  Logout05Icon,
  PencilEdit01Icon,
  Tick02Icon,
} from '@/_icons';
import { useStore } from '@/_store';

const classnames = {
  wrapper: 'flex gap-4 w-full',
  button:
    'flex items-center gap-2 rounded-lg border-2 border-transparent bg-dark p-4 px-4 hover:border-primary w-1/2 shadow-xl',
};

export function GameActions() {
  const deleteCell = useStore(state => state.deleteCell);
  const isNotesActive = useStore(state => state.isNotesActive);
  const setIsNotActive = useStore(state => state.setIsNotesActive);

  return (
    <div className={'flex flex-col gap-4 rounded-lg bg-light p-4 text-sm'}>
      <div className={classNames(classnames.wrapper)}>
        <button className={classNames(classnames.button)}>
          <ArrowTurnBackwardIcon />
          Annuler
        </button>
        <button className={classNames(classnames.button)} onClick={deleteCell}>
          <EraserIcon />
          Effacer
        </button>
      </div>
      <div className={classNames(classnames.wrapper)}>
        <button
          className={classNames(
            classnames.button,
            'relative',
            isNotesActive && 'text-green-500 hover:border-green-500',
          )}
          onClick={() => setIsNotActive(!isNotesActive)}
        >
          <PencilEdit01Icon />
          Notes
          {isNotesActive && (
            <span
              className={
                'absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 rounded-full border-[2px] border-green-500 bg-background p-1 text-green-500'
              }
            >
              <Tick02Icon className={'h-5 w-5 text-green-500'} />
            </span>
          )}
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
