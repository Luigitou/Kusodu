import { useStore } from '@/_store';

const PossibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Numbers = () => {
  const inputCell = useStore(state => state.inputCell);
  const inputNotes = useStore(state => state.inputNotes);
  const isNotesActive = useStore(state => state.isNotesActive);

  const handleClick = (number: number) => {
    if (isNotesActive) {
      inputNotes(number);
    } else {
      inputCell(number);
    }
  };

  return (
    <div
      className={
        'flex w-full flex-wrap items-center justify-center gap-1 md:gap-3'
      }
    >
      {PossibleNumbers.map(number => (
        <button
          onClick={() => handleClick(number)}
          className={
            'grow rounded-lg border-2 border-transparent bg-light py-2 text-center text-xl text-primary shadow-xl hover:border-primary md:h-24 lg:w-16 lg:grow-0 lg:p-0 lg:text-4xl'
          }
          key={number}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
