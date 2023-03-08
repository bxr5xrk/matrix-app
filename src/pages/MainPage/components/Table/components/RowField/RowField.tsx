/* eslint-disable jsx-a11y/no-static-element-interactions */
import { memo, useMemo, useState } from 'react';
import type { Cell } from '../../../../../../features/matrix/matrix.interfaces';
import { useMatrix } from '../../../../../../features/matrix/matrixContext';
import { getRowSum } from '../../../../../../utils/tableUtils';
import CellField from '../CellField/CellField';

interface RowFieldProps {
  row: Cell[];
  rowIndex: number;
}

function RowField({ row, rowIndex }: RowFieldProps) {
  const { removeRow } = useMatrix();
  const [showPercentage, setShowPercentage] = useState(false);

  const sum = useMemo(() => getRowSum(row), [row]);

  return (
    <tr>
      <td>Row {rowIndex + 1}</td>
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
        onMouseLeave={() => setShowPercentage(false)}
      >
        {sum}
      </td>
      <td>
        <span onClick={() => removeRow(rowIndex)}>&#10005;</span>
      </td>
    </tr>
  );
}

export default memo(RowField);
