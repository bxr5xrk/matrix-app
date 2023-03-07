import { memo } from 'react';
import Button from '../../../../components/Button/Button';
import type { Cell } from '../../../../features/matrix/matrix.interfaces';
import { useMatrix } from '../../../../features/matrix/matrixContext';
import RowField from './components/RowField/RowField';
import cl from './Table.module.scss';

const getColumnAverage = (matrix: Cell[][], column: number) => {
  const columnCells = matrix.map((row) => row[column]);
  const sum = columnCells.reduce((sum, cell) => sum + cell.amount, 0);
  const average = sum / matrix.length;
  return isNaN(average) ? 0 : average;
};

function Table() {
  const { matrix, removeHighlight, highlightedCellIds, addRow } = useMatrix();

  if (matrix.length === 0) {
    return null;
  }

  const handleHoverEnd = () =>
    highlightedCellIds.size ? removeHighlight() : undefined;

  return (
    <div className={cl.root}>
      <table>
        <thead>
          <tr>
            <th />
            {Array.from({ length: matrix[0].length }, (_, i) => (
              <th key={i}>Column {i + 1}</th>
            ))}
            <th>Sum values</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody onMouseLeave={handleHoverEnd}>
          {matrix.map((row, index) => (
            <RowField key={index} row={row} rowIndex={index} />
          ))}
          <tr>
            <td>Average values</td>
            {Array.from({ length: Number(matrix[0].length) + 1 }, (_, i) => {
              if (i === matrix[0].length) {
                return null;
              }
              const average = getColumnAverage(matrix, i);
              return <td key={i}>{average ? average.toFixed(1) : ''}</td>;
            })}
          </tr>
        </tbody>
      </table>
      <Button onClick={addRow} title="Add new row" />
    </div>
  );
}

export default memo(Table);
