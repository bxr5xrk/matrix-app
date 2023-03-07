import { forwardRef, memo } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react';
import cl from './Input.module.scss';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
      <div className={cl.root}>
        <label htmlFor={id}>{label}</label>

        <input id={id} {...props} ref={ref} />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default memo(Input);
