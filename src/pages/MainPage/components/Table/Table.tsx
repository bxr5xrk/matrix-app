import { memo } from 'react';
import type { Cell } from '../../../../features/matrix/matrix.interfaces';
import { useMatrix } from '../../../../features/matrix/matrixContext';

interface CellFieldProps {
  cell: Cell;
}

function CellField({ cell }: CellFieldProps) {
  const { id, amount } = cell;
  const { updateCell } = useMatrix();

  const handleCellClick = () => {
    updateCell(id);
  };

  return <td onClick={handleCellClick}>{amount}</td>;
}

function Table() {
  const { matrix } = useMatrix();

  if (matrix.length === 0) {
    return null;
  }

  const getRowSum = (row: Cell[]) => {
    return row.reduce((sum, cell) => sum + cell.amount, 0);
  };

  const getColumnAverage = (matrix: Cell[][], column: number) => {
    const columnCells = matrix.map((row) => row[column]);
    const sum = columnCells.reduce((sum, cell) => sum + cell.amount, 0);
    const average = sum / matrix.length;
    return isNaN(average) ? 0 : average;
  };

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
          <tr key={i}>
            {row.map((cell) => (
              <CellField key={cell.id} cell={cell} />
              // <td key={cell.id}>{cell.amount}</td>
            ))}
            <td>{getRowSum(row)}</td>
          </tr>
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
