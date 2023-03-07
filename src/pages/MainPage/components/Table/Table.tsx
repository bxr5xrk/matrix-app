import { memo, useState } from 'react';
import type { Cell } from '../../../../features/matrix/matrix.interfaces';
import { useMatrix } from '../../../../features/matrix/matrixContext';

interface CellFieldProps {
  cell: Cell;
  rowIndex: number;
  cellIndex: number;
  showPercentage: boolean;
}

function CellField({
  cell,
  rowIndex,
  cellIndex,
  showPercentage
}: CellFieldProps) {
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
      {`${amount}${showPercentage ? '%' : ''}`}
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

const getCollPercentageAmount = (cells: Cell[], sum: number) =>
  cells.map((num) => ({
    ...num,
    amount: Math.floor((num.amount / sum) * 100)
  }));

function RowField({ row, rowIndex }: RowFieldProps) {
  const [showPercentage, setShowPercentage] = useState(false);
  const sum = getRowSum(row);

  const _row = showPercentage ? getCollPercentageAmount(row, sum) : row;

  return (
    <tr>
      {_row.map((cell, index) => (
        <CellField
          key={cell.id}
          cell={cell}
          rowIndex={rowIndex}
          cellIndex={index}
          showPercentage={showPercentage}
        />
      ))}
      <td
        onMouseEnter={() => setShowPercentage(true)}
        onMouseLeave={() => setShowPercentage(false)}
      >
        {sum}
      </td>
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
