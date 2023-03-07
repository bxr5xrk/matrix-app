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

// interface TableState {
//   rows: Row[];
//   averages: number[];
//   highlightedCells: Set<number>;
// }

interface MatrixContextValue {
  matrix: Cell[][];
  x: number;
  incrementCellAmount: (i: number, j: number) => void;
  setMatrix: (i: Cell[][]) => void;
  setX: (i: number) => void;
  highlightedCellIds: Set<number>;
  addHighlight: (i: number, j: number) => void;
  removeHighlight: () => void;
  addRow: () => void;
  removeRow: (i: number) => void;
}

// interface TableContextValue {
//   state: TableState;
//   updateCell: (rowIndex: number, cellIndex: number, newValue: number) => void;
//   removeRow: (rowIndex: number) => void;
//   addRow: () => void;
// }

export type {
  Cell,
  Row,
  // TableState,
  MatrixContextValue
  //  TableContextValue
};
