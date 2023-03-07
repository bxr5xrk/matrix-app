import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Cell, MatrixContextValue } from './matrix.interfaces';
// import type { ReactNode } from 'react';
// import type { TableContextValue, TableState } from './matrix.interfaces';

// export const MatrixContext = createContext<TableContextValue>({
//   state: { rows: [], averages: [], highlightedCells: new Set() },
//   updateCell: () => {},
//   removeRow: () => {},
//   addRow: () => {}
// });

// interface TableProviderProps {
//   rows: number;
//   columns: number;
//   initialData?: number[][];
//   children: ReactNode;
// }

export const MatrixContext = createContext<MatrixContextValue>({
  matrix: [],
  updateCell: () => {},
  setMatrix: () => {}
});

interface MatrixProviderProps {
  children: ReactNode;
}

export const useMatrix = () => useContext(MatrixContext);

export function MatrixProvider({ children }: MatrixProviderProps) {
  const [matrix, setMatrix] = useState<Cell[][]>([]);

  const updateCell = (id: number) => {
    const updatedMatrix = matrix.map((row) => {
      return row.map((cell) => {
        if (cell.id === id) {
          return {
            ...cell,
            amount: cell.amount + 1
          };
        }
        return cell;
      });
    });

    setMatrix(updatedMatrix);
  };

  return (
    <MatrixContext.Provider value={{ matrix, updateCell, setMatrix }}>
      {children}
    </MatrixContext.Provider>
  );
}
