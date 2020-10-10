import React from 'react';
import classNames from 'classnames';

import Clock from 'src/elements/components/clock/Clock';

import './style.css';

export interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={classNames('header', className)}>
      <h1 className='header-title'>CPU/RAM monitoring App</h1>
      <Clock />
    </header>
  );
};

export default Header;
