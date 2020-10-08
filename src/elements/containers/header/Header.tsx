import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './style.css';
import Clock from "src/elements/components/clock/Clock";

export interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {

  const renderNavItems = (navItems: string[]) => {
    return navItems.map(navItem => {
      return (
        <li className='nav__item' key={navItem}>
          <NavLink
            className='nav__link'
            activeClassName='nav__link_active'
            to={navItem}
          >
            {navItem}
          </NavLink>
        </li>
      );
    });
  };

  useEffect(() => {
  }, []);

  return (
    <header className={classNames('header', className)}>
      <nav className='header__nav nav'>
      </nav>
      <Clock/>
    </header>
  );
};

export default Header;
