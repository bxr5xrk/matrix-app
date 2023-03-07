import { memo, useRef } from 'react';
import { useMatrix } from '../../../../features/matrix/matrixContext';
import type { Cell } from '../../../../features/matrix/matrix.interfaces';

interface createMatrixProps {
  m: number;
  n: number;
}

const createMatrix = ({ m, n }: createMatrixProps) => {
  const generateMatrix = () => {
    const matrix: Cell[][] = [];

    for (let i = 0; i < m; i++) {
      const row: Cell[] = [];

      for (let j = 1; j <= n; j++) {
        row.push({
          id: i * n + j,
          amount: Math.floor(Math.random() * 900) + 100
        });
      }

      matrix.push(row);
    }

    return matrix;
  };

  const matrix = generateMatrix();

  return matrix;
};

function Form() {
  const { setMatrix } = useMatrix();
  const NRef = useRef<HTMLInputElement>(null);
  const MRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (NRef.current !== null && MRef.current !== null) {
      const NValue = Number(NRef.current.value);
      const MValue = Number(MRef.current.value);

      const dimensions = { m: MValue, n: NValue };

      setMatrix(createMatrix(dimensions));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={NRef}
        id="N"
        type="number"
        placeholder="enter N"
        min={0}
        max={100}
      />
      <input
        ref={MRef}
        id="M"
        type="number"
        placeholder="enter M"
        min={0}
        max={100}
      />
      <button type="submit">submit</button>
    </form>
  );
}

export default memo(Form);
