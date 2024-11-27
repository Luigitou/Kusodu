import { useStore } from '@/_store';

export const Grid = () => {
  const grid = useStore(state => state.grid);

  return (
    <div
      className={'grid grid-cols-3 gap-2 overflow-hidden rounded-lg shadow-xl'}
    >
      {grid?.grid.map((line, row) => (
        <div className={'grid grid-cols-3 gap-1 shadow-xl'} key={row}>
          {line.map((cell, column) => (
            <span
              key={column}
              className={
                'flex aspect-square w-14 items-center justify-center bg-light shadow-xl'
              }
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
