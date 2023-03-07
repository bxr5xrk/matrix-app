import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { memo } from 'react';
import cl from './Button.module.scss';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
}

function Button({ title, children, ...props }: ButtonProps) {
  return (
    <button className={cl.root} {...props}>
      {title}
    </button>
  );
}

export default memo(Button);
