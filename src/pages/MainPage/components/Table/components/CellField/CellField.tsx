import { memo } from 'react';
import type { Cell } from '../../../../../../features/matrix/matrix.interfaces';
import { useMatrix } from '../../../../../../features/matrix/matrixContext';

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
          ? 'var(--primary)'
          : undefined
      }}
      onMouseEnter={onHoverStart}
      onClick={handleCellClick}
    >
      {value}
    </td>
  );
}

export default memo(CellField);
