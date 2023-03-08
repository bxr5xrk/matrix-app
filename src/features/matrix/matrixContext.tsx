import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Cell, CellId, MatrixContextValue } from './matrix.interfaces';

export const MatrixContext = createContext<MatrixContextValue>({
  matrix: [],
  x: 0,
  incrementCellAmount: () => {},
  setInitialData: () => {},
  highlightedCellIds: new Set(),
  addHighlight: () => {},
  removeHighlight: () => {},
  addRow: () => {},
  removeRow: () => {}
});

interface MatrixProviderProps {
  children: ReactNode;
}

export const useMatrix = () => useContext(MatrixContext);

export function MatrixProvider({ children }: MatrixProviderProps) {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [x, setX] = useState(0);
  const [highlightedCellIds, setHighlightedCellIds] = useState<Set<CellId>>(
    new Set()
  );

  const incrementCellAmount = useCallback((i: number, j: number) => {
    setMatrix((prevMatrix) => {
      const newMatrix = [...prevMatrix];
      newMatrix[i][j] = {
        ...newMatrix[i][j],
        amount: newMatrix[i][j].amount + 1
      };
      return newMatrix;
    });
  }, []);

  const addHighlight = useCallback(
    (i: number, j: number) => {
      const activeCellAmount = matrix[i][j].amount;

      const allAmounts = matrix.flatMap((row) =>
        row.map((cell) => cell.amount)
      );

      const sortedAmounts = [...allAmounts].sort(
        (a, b) =>
          Math.abs(a - activeCellAmount) - Math.abs(b - activeCellAmount)
      );

      const nearestAmounts = sortedAmounts.slice(1, x + 1); // exclude the hovered cell itself

      const nearestCells = matrix.flatMap((row) =>
        row.filter((cell) => nearestAmounts.includes(cell.amount))
      );

      setHighlightedCellIds(new Set(nearestCells.map((cell) => cell.id)));
    },
    [matrix, x, setHighlightedCellIds]
  );

  const removeHighlight = useCallback(
    () => setHighlightedCellIds(new Set()),
    []
  );

  const addRow = useCallback(
    () =>
      setMatrix((prev) => {
        const lastRow = matrix[matrix.length - 1];
        const lastCellId = lastRow[lastRow.length - 1].id;

        const newRow: Cell[] = [];
        for (let i = 0; i < matrix[0].length; i++) {
          newRow.push({
            id: lastCellId + i + 1,
            amount: Math.floor(Math.random() * 900) + 100
          });
        }

        return [...prev, newRow];
      }),
    [matrix]
  );

  const removeRow = useCallback(
    (rowIndex: number) =>
      setMatrix((prev) => {
        const newMatrix = [...prev];
        newMatrix.splice(rowIndex, 1);

        return newMatrix;
      }),
    []
  );

  const setInitialData = useCallback(
    ({ x, matrix }: { x: number; matrix: Cell[][] }) => {
      setX(x);
      setMatrix(matrix);
    },
    []
  );

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        incrementCellAmount,
        setInitialData,
        x,
        highlightedCellIds,
        addHighlight,
        removeHighlight,
        addRow,
        removeRow
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
}
