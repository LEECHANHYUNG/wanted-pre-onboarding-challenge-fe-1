import React from 'react';

interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  onClick: (e: any) => void | Promise<void>;
  id: string | undefined;
  disabled: boolean | undefined;
  value: string | undefined;
  children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClick || null}
      id={props.id}
      disabled={props.disabled || false}
      value={props.value || ''}
    >
      {props.children}
    </button>
  );
};

export default Button;
