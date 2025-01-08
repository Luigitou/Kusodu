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
  wrapper: 'flex gap-2 md:gap-4 md:w-full w-full',
  button:
    'flex items-center gap-2 rounded-lg border-2 border-transparent bg-dark p-4 px-4 hover:border-primary grow md:w-1/2 shadow-xl',
};

export function GameActions() {
  const deleteCell = useStore(state => state.deleteCell);
  const isNotesActive = useStore(state => state.isNotesActive);
  const setIsNotActive = useStore(state => state.setIsNotesActive);

  return (
    <div
      className={
        'flex w-full flex-row gap-2 rounded-lg bg-light p-2 text-sm md:flex-col md:gap-4 md:p-4'
      }
    >
      <div className={classNames(classnames.wrapper)}>
        <button className={classNames(classnames.button)}>
          <ArrowTurnBackwardIcon />
          <span className={'hidden md:block'}>Annuler</span>
        </button>
        <button className={classNames(classnames.button)} onClick={deleteCell}>
          <EraserIcon />
          <span className={'hidden md:block'}>Effacer</span>
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
          <span className={'hidden md:block'}>Notes</span>
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
          <span className={'hidden md:block'}>Quitter</span>
        </button>
      </div>
    </div>
  );
}
