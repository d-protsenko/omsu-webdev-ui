import React from 'react';
import classNames from 'classnames';

import './style.css';

export interface ActionViewProps extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  onClick?: (event) => void;
  children?: any;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset' | undefined;
}

const ActionView: React.FC<ActionViewProps> = ({
  className,
  onClick = () => {},
  children,
  disabled = false,
  type = 'button',
  ...other
}) => {
  return (
    <button
      className={classNames('action-view', className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...other}
    >
      {children}
    </button>
  );
};

export default ActionView;
