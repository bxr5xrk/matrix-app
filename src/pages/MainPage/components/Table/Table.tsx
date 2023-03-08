import Button from '../../../../components/Button/Button';
import { useMatrix } from '../../../../features/matrix/matrixContext';
import { getColumnAverage } from '../../../../utils/tableUtils';
import RowField from './components/RowField/RowField';
import cl from './Table.module.scss';

function Table() {
  const { matrix, addRow } = useMatrix();

  if (matrix.length === 0) {
    return null;
  }

  return (
    <div className={cl.root}>
      <table>
        <thead>
          {/* head */}
          <tr>
            <th />
            {[...Array(matrix[0].length)].map((_, index) => (
              <th key={index}>Column {index + 1}</th>
            ))}
            <th>Sum values</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {/* main */}
          {matrix.map((row, index) => (
            <RowField key={index} row={row} rowIndex={index} />
          ))}

          {/* bottom */}
          <tr>
            <td>Average values</td>
            {[...Array(+matrix[0].length + 1)].map((_, index) =>
              index !== matrix[0].length ? (
                <td key={index}>{getColumnAverage(matrix, index)}</td>
              ) : null
            )}
          </tr>
        </tbody>
      </table>
      <Button onClick={addRow} title="Add new row" />
    </div>
  );
}

export default Table;
