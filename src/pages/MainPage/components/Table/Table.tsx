import { memo, useState } from 'react';
import type { Cell } from '../../../../features/matrix/matrix.interfaces';
import { useMatrix } from '../../../../features/matrix/matrixContext';

interface CellFieldProps {
  cell: Cell;
  rowIndex: number;
  cellIndex: number;
  showPercentage: boolean;
  sum: number;
}

function CellField({
  cell,
  rowIndex,
  cellIndex,
  showPercentage,
  sum
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

  const percentage = showPercentage ? Math.floor((amount / sum) * 100) : 0;

  const value = showPercentage
    ? `${percentage}${showPercentage ? '%' : ''}`
    : amount;

  return (
    <td
      style={{
        transition: 'background-color 0.3s ease',
        background: showPercentage
          ? `linear-gradient(to right, var(--primary) 0, rgba(0,0,0,0) ${percentage}%)`
          : isActive
          ? 'red'
          : undefined
      }}
      onMouseEnter={onHoverStart}
      onClick={handleCellClick}
    >
      {value}
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
  const { removeHighlight } = useMatrix();

  const [showPercentage, setShowPercentage] = useState(false);
  const sum = getRowSum(row);

  return (
    <tr>
      {row.map((cell, index) => (
        <CellField
          key={cell.id}
          cell={cell}
          rowIndex={rowIndex}
          cellIndex={index}
          sum={sum}
          showPercentage={showPercentage}
        />
      ))}
      <td
        onMouseEnter={() => setShowPercentage(true)}
        onMouseLeave={() => {
          setShowPercentage(false);
          removeHighlight();
        }}
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
