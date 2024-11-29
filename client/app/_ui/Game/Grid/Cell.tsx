'use client';

import { useStore } from '@/_store';
import classNames from 'classnames';

type CellProps = {
  number: number;
  row: number;
  column: number;
  selectedCell: { row: number; column: number } | null;
};

export const Cell = ({ number, row, column, selectedCell }: CellProps) => {
  const setSelectedCell = useStore(state => state.setSelectedCell);

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

  const handleClick = () => {
    setSelectedCell({ row, column });
  };

  return (
    <span
      className={classNames(
        'flex aspect-square w-14 items-center justify-center bg-light text-2xl shadow-xl',
        isSelected(row, column)
          ? 'bg-primary'
          : isColumnOrRowSelected(row, column) || isSquareSelected(row, column)
            ? 'bg-primary/40'
            : '',
      )}
      onClick={handleClick}
    >
      {number !== 0 ? number : ''}
    </span>
  );
};
