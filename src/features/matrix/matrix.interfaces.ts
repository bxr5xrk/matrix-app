export type CellId = number;
export type CellValue = number;

interface Cell {
  id: CellId; // unique value for all table
  amount: CellValue; // three digit random number
}

interface Row {
  cells: Cell[];
  sum: number;
}

interface MatrixContextValue {
  matrix: Cell[][];
  x: number;
  incrementCellAmount: (i: number, j: number) => void;
  setInitialData: ({ x, matrix }: { x: number; matrix: Cell[][] }) => void;
  highlightedCellIds: Set<number>;
  addHighlight: (i: number, j: number) => void;
  removeHighlight: () => void;
  addRow: () => void;
  removeRow: (i: number) => void;
}

export type { Cell, Row, MatrixContextValue };
