import { useStore } from '@/_store';
import { Cell } from '@/_ui/Game/Grid/Cell';

export const Grid = () => {
  const grid = useStore(state => state.grid);
  const selectedCell = useStore(state => state.selectedCell);

  return (
    <div className='grid grid-cols-3 gap-2 overflow-hidden rounded-lg shadow-xl'>
      {grid?.grid.map((square, squareIndex) => (
        <div className='grid grid-cols-3 gap-1 shadow-xl' key={squareIndex}>
          {square.map((cell, cellIndex) => {
            const row =
              Math.floor(squareIndex / 3) * 3 + Math.floor(cellIndex / 3);
            const column = (squareIndex % 3) * 3 + (cellIndex % 3);

            return (
              <Cell
                key={`${row}-${column}`}
                number={cell}
                row={row}
                column={column}
                selectedCell={selectedCell}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
