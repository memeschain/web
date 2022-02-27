import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/header.css';

const AppHeader = (props) => {
  return (
    <div className="app-header-wrapper padding-large">
      <div className="logo circular-medium">
        <h1 className="word-mark">
          <NavLink activeClassName="logo-active" exact to="/">MemesChain</NavLink>
        </h1>
      </div>
      <nav>
        { props.children }
      </nav>
    </div>
  );
};

export default AppHeader;
