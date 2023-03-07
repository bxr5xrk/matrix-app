import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Cell, MatrixContextValue } from './matrix.interfaces';

export const MatrixContext = createContext<MatrixContextValue>({
  matrix: [],
  x: 0,
  updateCell: () => {},
  setMatrix: () => {},
  setX: () => {}
});

interface MatrixProviderProps {
  children: ReactNode;
}

export const useMatrix = () => useContext(MatrixContext);

export function MatrixProvider({ children }: MatrixProviderProps) {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [x, setX] = useState(0);

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
    <MatrixContext.Provider value={{ matrix, updateCell, setMatrix, x, setX }}>
      {children}
    </MatrixContext.Provider>
  );
}
