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

interface TableState {
  rows: Row[];
  averages: number[];
  highlightedCells: Set<number>;
}

interface MatrixContextValue {
  matrix: Cell[][];
  updateCell: (id: number) => void;
  setMatrix: (i: Cell[][]) => void;
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
  TableState,
  MatrixContextValue
  //  TableContextValue
};
