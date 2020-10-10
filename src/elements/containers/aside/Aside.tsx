import React from 'react';
import classNames from 'classnames';
import './style.css';

export interface Props {
  className?: string;
  title?: string;
  children: any;
}

const Aside: React.FC<Props> = ({ className, title, children }) => (
  <aside className={classNames('aside', className)}>
    <h1 className='aside__title'>{title}</h1>
    {children}
  </aside>
);

export default Aside;
