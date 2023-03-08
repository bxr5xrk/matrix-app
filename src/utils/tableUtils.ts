import type { Cell } from '../features/matrix/matrix.interfaces';

export const getColumnAverage = (matrix: Cell[][], column: number) => {
  const columnCells = matrix.map((row) => row[column]);
  const sum = columnCells.reduce((sum, cell) => sum + cell.amount, 0);
  const average = sum / matrix.length;
  return isNaN(average) ? '' : average.toFixed(1);
};

export const getRowSum = (row: Cell[]) =>
  row.reduce((sum, cell) => sum + cell.amount, 0);
