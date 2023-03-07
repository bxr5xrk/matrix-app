import { memo, useState } from 'react';
import type { Cell } from '../../../../features/matrix/matrix.interfaces';
import { useMatrix } from '../../../../features/matrix/matrixContext';

interface CellFieldProps {
  cell: Cell;
  setHoveredCellId: (i: number | null) => void;
}

function CellField({ cell, setHoveredCellId }: CellFieldProps) {
  const { id, amount } = cell;
  const { updateCell } = useMatrix();

  const handleCellClick = () => {
    updateCell(id);
  };

  const onHoverStart = () => {
    setHoveredCellId(id);
  };
  const onHoverEnd = () => {
    setHoveredCellId(null);
  };

  return (
    <td
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={handleCellClick}
    >
      {amount}
    </td>
  );
}

interface RowFieldProps {
  row: Cell[];
  setHoveredCellId: (i: number | null) => void;
}

const getRowSum = (row: Cell[]) => {
  return row.reduce((sum, cell) => sum + cell.amount, 0);
};

function RowField({ row, setHoveredCellId }: RowFieldProps) {
  return (
    <tr>
      {row.map((cell) => (
        <CellField
          setHoveredCellId={setHoveredCellId}
          key={cell.id}
          cell={cell}
        />
      ))}
      <td>{getRowSum(row)}</td>
    </tr>
  );
}

function Table() {
  const { matrix } = useMatrix();
  const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);

  if (matrix.length === 0) {
    return null;
  }

  const getColumnAverage = (matrix: Cell[][], column: number) => {
    const columnCells = matrix.map((row) => row[column]);
    const sum = columnCells.reduce((sum, cell) => sum + cell.amount, 0);
    const average = sum / matrix.length;
    return isNaN(average) ? 0 : average;
  };

  console.log(hoveredCellId);

  return (
    <table>
      <thead>
        <tr>
          {Array.from({ length: matrix[0].length }, (_, i) => (
            <th key={i}>Column {i + 1}</th>
          ))}
          <th>Row Sum</th>
        </tr>
      </thead>
      <tbody>
        {matrix.map((row, i) => (
          <RowField setHoveredCellId={setHoveredCellId} key={i} row={row} />
        ))}
        <tr>
          {Array.from({ length: Number(matrix[0].length) + 1 }, (_, i) => {
            if (i === matrix[0].length) {
              return <td key={i}>Column Average</td>;
            }
            const average = getColumnAverage(matrix, i);
            return <td key={i}>{isNaN(average) ? '' : average}</td>;
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default memo(Table);
