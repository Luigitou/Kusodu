import { Cell } from '@/_ui/Game/Grid/Cell';

export const Grid = () => {
  return (
    <div className='flex flex-col overflow-hidden rounded-lg p-2 shadow-xl sm:m-auto md:m-auto'>
      {Array.from({ length: 9 }, (_, rowIndex) => (
        <div className='flex' key={rowIndex}>
          {Array.from({ length: 9 }, (_, columnIndex) => (
            <Cell
              key={`${rowIndex}-${columnIndex}`}
              row={rowIndex}
              column={columnIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
