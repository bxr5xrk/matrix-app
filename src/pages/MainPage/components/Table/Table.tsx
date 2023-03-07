import { memo } from 'react';
import type { Cell } from '../../../../features/matrix/matrix.interfaces';
import { useMatrix } from '../../../../features/matrix/matrixContext';

interface CellFieldProps {
  cell: Cell;
  rowIndex: number;
  cellIndex: number;
}

function CellField({ cell, rowIndex, cellIndex }: CellFieldProps) {
  const { amount, id } = cell;
  const { incrementCellAmount, addHighlight, highlightedCellIds } = useMatrix();

  const handleCellClick = () => {
    incrementCellAmount(rowIndex, cellIndex);
  };

  const onHoverStart = () => {
    addHighlight(rowIndex, cellIndex);
  };

  const isActive = highlightedCellIds.has(id);

  return (
    <td
      style={{
        backgroundColor: isActive ? 'red' : undefined
      }}
      onMouseEnter={onHoverStart}
      onClick={handleCellClick}
    >
      {amount}
    </td>
  );
}

interface RowFieldProps {
  row: Cell[];
  rowIndex: number;
}

const getRowSum = (row: Cell[]) => {
  return row.reduce((sum, cell) => sum + cell.amount, 0);
};

function RowField({ row, rowIndex }: RowFieldProps) {
  return (
    <tr>
      {row.map((cell, index) => (
        <CellField
          key={cell.id}
          cell={cell}
          rowIndex={rowIndex}
          cellIndex={index}
        />
      ))}
      <td>{getRowSum(row)}</td>
    </tr>
  );
}

function Table() {
  const { matrix, removeHighlight } = useMatrix();

  if (matrix.length === 0) {
    return null;
  }

  const getColumnAverage = (matrix: Cell[][], column: number) => {
    const columnCells = matrix.map((row) => row[column]);
    const sum = columnCells.reduce((sum, cell) => sum + cell.amount, 0);
    const average = sum / matrix.length;
    return isNaN(average) ? 0 : average;
  };

  const handleHoverEnd = () => removeHighlight();

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
      <tbody onMouseLeave={handleHoverEnd}>
        {matrix.map((row, index) => (
          <RowField key={index} row={row} rowIndex={index} />
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
