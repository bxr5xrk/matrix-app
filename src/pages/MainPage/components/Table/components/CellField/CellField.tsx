import { memo, useCallback, useMemo } from 'react';
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

  const handleCellClick = useCallback(() => {
    incrementCellAmount(rowIndex, cellIndex);
  }, []);

  const onHoverStart = useCallback(() => {
    addHighlight(rowIndex, cellIndex);
  }, []);

  const isActive = useMemo(
    () => highlightedCellIds.has(id),
    [highlightedCellIds]
  );

  const percentage = useMemo(
    () => (showPercentage ? Math.floor((amount / sum) * 100) : 0),
    [showPercentage, amount, sum]
  );

  const value = useMemo(
    () =>
      showPercentage ? `${percentage}${showPercentage ? '%' : ''}` : amount,
    [showPercentage, percentage, amount]
  );

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
