const PossibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Numbers = () => {
  return (
    <div className={'flex w-full flex-wrap items-center justify-center gap-3'}>
      {PossibleNumbers.map(number => (
        <button
          className={
            'h-24 w-16 rounded-lg border-2 border-transparent bg-light text-center text-xl text-primary shadow-xl hover:border-primary'
          }
          key={number}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
