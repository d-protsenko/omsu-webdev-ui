import React from 'react';
import classNames from 'classnames';

import './style.css';

export interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={classNames('footer', className)}>
      <h1 className='footer-info'>Danil Protsenko</h1>
    </footer>
  );
};

export default Footer;
