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

  return (
    <span
      className={classNames(
        'flex aspect-square w-14 items-center justify-center bg-light text-2xl shadow-xl',
        column % 3 === 2 ? 'mr-2' : 'mr-1',
        row % 3 === 2 ? 'mb-2' : 'mb-1',
        isSelected(row, column)
          ? `bg-primary ${isErrorCell(row, column) && 'text-red-500'}`
          : isErrorCell(row, column)
            ? 'bg-red-300 text-red-500'
            : isColumnOrRowSelected(row, column) ||
                isSquareSelected(row, column)
              ? 'bg-primary/40'
              : '',
        column === 8 && 'mr-0',
        row === 8 && 'mb-0',
      )}
      onClick={handleClick}
    >
      {number !== 0
        ? number
        : isErrorCell(row, column)
          ? errorCells.find(cell => cell.row === row && cell.column === column)
              ?.value
          : ''}
    </span>
  );
};
