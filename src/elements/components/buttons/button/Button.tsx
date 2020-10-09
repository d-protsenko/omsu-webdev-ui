import React from 'react';
import classNames from 'classnames';

import ActionView, { ActionViewProps } from 'src/elements/atoms/actionView/ActionView';

import './style.css';

export interface ButtonProps extends ActionViewProps {
  title?: any;
  leftIcon?: any;
  rightIcon?: any;
  color?: 'primary' | 'secondary' | 'ghost' | 'red';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  className,
  leftIcon = null,
  rightIcon = null,
  color = 'primary',
  title,
  ...other
}) => {
  const renderLeftIcon = () => {
    if (!leftIcon) {
      return null;
    }
    return <div className='button__icon button__icon_left'>{leftIcon}</div>;
  };

  const renderTitle = () => {
    if (!title) {
      return null;
    }
    return <div className='button__title'>{title}</div>;
  };

  const renderRightIcon = () => {
    if (!rightIcon) {
      return null;
    }
    return <div className='button__icon button__icon_right'>{rightIcon}</div>;
  };

  return (
    <ActionView className={classNames('button', { [`button_color_${color}`]: color }, className)} {...other}>
      {renderLeftIcon()}
      {renderTitle()}
      {renderRightIcon()}
    </ActionView>
  );
};

export default Button;
