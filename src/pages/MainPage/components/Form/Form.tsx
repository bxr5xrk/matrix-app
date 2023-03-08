import { memo, useRef } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import { useMatrix } from '../../../../features/matrix/matrixContext';
import { generateMatrix } from '../../../../utils/matrixUtils';
import cl from './Form.module.scss';

function Form() {
  const { setInitialData } = useMatrix();
  const NRef = useRef<HTMLInputElement>(null);
  const MRef = useRef<HTMLInputElement>(null);
  const XRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (NRef.current && MRef.current && XRef.current) {
      const NValue = Number(NRef.current.value);
      const MValue = Number(MRef.current.value);
      const XValue = Number(XRef.current.value);

      const dimensions = { m: MValue, n: NValue };

      setInitialData({ x: XValue, matrix: generateMatrix(dimensions) });
    }
  };

  return (
    <form className={cl.root} onSubmit={handleSubmit}>
      <h2>Create Matrix</h2>
      <div className={cl.inputs}>
        <Input
          required
          ref={NRef}
          id="N"
          type="number"
          placeholder="enter N"
          min={1}
          max={100}
          label="N"
        />

        <Input
          required
          label="M"
          ref={MRef}
          id="M"
          type="number"
          placeholder="enter M"
          min={1}
          max={100}
        />

        <Input
          required
          label="X"
          ref={XRef}
          id="X"
          type="number"
          placeholder="enter X"
          min={0}
          max={1000}
        />
      </div>

      <Button type="submit" title="Submit" />
    </form>
  );
}

export default memo(Form);
