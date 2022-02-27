import React from 'react';
import loader from '../../images/loader/loader.gif';
import './css/index.css';

const AppLoader = () => (
  <div className="app-loader margin-vertical-large">
    <img src={loader} className="loader-image" alt="loading" />
  </div>
);

export default AppLoader;