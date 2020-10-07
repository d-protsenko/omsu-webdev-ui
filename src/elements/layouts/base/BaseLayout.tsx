import React from 'react';

import Header from 'src/elements/containers/header/Header';

import './style.css';

interface Props {
  children: any;
}

const BaseLayout: React.FC<Props> = ({ children = null }) => {
  return (
    <div className='app'>
      <Header className='app__header' />
      <main className='app__main'>{children}</main>
    </div>
  );
};

export default BaseLayout;
