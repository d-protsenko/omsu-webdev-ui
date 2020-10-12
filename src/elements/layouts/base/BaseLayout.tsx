import React from 'react';

import Header from 'src/elements/containers/header/Header';
import Footer from 'src/elements/containers/footer/Footer';

import './style.css';

interface Props {
  children: any;
}

const BaseLayout: React.FC<Props> = ({ children = null }) => {
  return (
    <div className='app'>
      <Header className='app__header' />
      <main className='app__main'>{children}</main>
      <Footer className='app__footer' />
    </div>
  );
};

export default BaseLayout;
