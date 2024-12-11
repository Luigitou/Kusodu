'use client';

import { useStore } from '@/_store';
import classNames from 'classnames';

type CellProps = {
  row: number;
  column: number;
};

export const Cell = ({ row, column }: CellProps) => {
  const selectedCell = useStore(state => state.selectedCell);
  const number = useStore(state => state.grid?.grid[row][column]);
  const setSelectedCell = useStore(state => state.setSelectedCell);
  const errorCells = useStore(state => state.errorCells);
  const notesCells = useStore(state => state.notesCells);
  const timerIsPaused = useStore(state => state.timerIsPaused);

  const isSelected = (row: number, column: number) => {
    if (!selectedCell) return false;
    return selectedCell.row === row && selectedCell.column === column;
  };

  const isColumnOrRowSelected = (row: number, column: number) => {
    if (!selectedCell) return false;
    return selectedCell.row === row || selectedCell.column === column;
  };

  const isSquareSelected = (row: number, column: number) => {
    if (!selectedCell) return false;

    const selectedSquareRow = Math.floor(selectedCell.row / 3);
    const selectedSquareColumn = Math.floor(selectedCell.column / 3);

    const currentSquareRow = Math.floor(row / 3);
    const currentSquareColumn = Math.floor(column / 3);

    return (
      selectedSquareRow === currentSquareRow &&
      selectedSquareColumn === currentSquareColumn
    );
  };

  const isErrorCell = (row: number, column: number) => {
    return errorCells.some(cell => cell.row === row && cell.column === column);
  };

  const handleClick = () => {
    setSelectedCell({ row, column });
  };

  const getCellDisplayValue = (row: number, column: number) => {
    if (timerIsPaused) {
      return '';
    } else if (number !== 0) {
      return number;
    } else if (number === 0) {
      const errorCell = errorCells.find(
        cell => cell.row === row && cell.column === column,
      );
      if (errorCell) {
        return errorCell.value;
      } else {
        const noteCell = notesCells.find(
          cell => cell.row === row && cell.column === column,
        );
        if (noteCell) {
          const { numbers } = noteCell;

          return (
            <div className={'grid h-full w-full grid-cols-3 gap-1 text-xs'}>
              {Array.from({ length: 9 }).map((_, number) => (
                <span
                  key={number + 1}
                  className={classNames(
                    'text-center',
                    numbers.includes(number + 1) ? 'visible' : 'invisible',
                  )}
                >
                  {number + 1}
                </span>
              ))}
            </div>
          );
        } else {
          return '';
        }
      }
    } else {
      return '';
    }
  };

  return (
    <span
      className={classNames(
        'flex aspect-square w-14 cursor-pointer items-center justify-center bg-light text-2xl shadow-xl',
        column === 8 ? '' : column % 3 === 2 ? 'mr-2' : 'mr-1',
        row === 8 ? '' : row % 3 === 2 ? 'mb-2' : 'mb-1',
        isSelected(row, column)
          ? `bg-primary ${isErrorCell(row, column) && 'text-red-500'}`
          : isErrorCell(row, column) && !timerIsPaused
            ? 'bg-red-500/30 text-red-500'
            : isColumnOrRowSelected(row, column) ||
                isSquareSelected(row, column)
              ? 'bg-primary/40'
              : '',
      )}
      onClick={handleClick}
    >
      {getCellDisplayValue(row, column)}
    </span>
  );
};
