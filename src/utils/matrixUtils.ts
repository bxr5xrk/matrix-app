import type { Cell } from '../features/matrix/matrix.interfaces';

interface createMatrixProps {
  m: number;
  n: number;
}

export const generateMatrix = ({ m, n }: createMatrixProps) => {
  const matrix: Cell[][] = [];

  for (let i = 0; i < m; i++) {
    const row: Cell[] = [];

    for (let j = 1; j <= n; j++) {
      row.push({
        id: i * n + j,
        amount: Math.floor(Math.random() * 900) + 100
      });
    }

    matrix.push(row);
  }

  return matrix;
};
