import React from 'react';
import './css/index.css';

const AppPlaceholders = (props) => (
  <div className={`placeholder-flex-wrapper ${props.className||''}`}>
    <div className="upper-text margin-vertical-large">
      <h3>{props.upper}</h3>
    </div>
    <div className="placehoder-img-wrapper">
      <img src={props.src} alt=""/>
    </div>
    <div className="lower-text margin-vertical-large">
      <p>{props.lower}</p>
    </div>
    {props.children}
  </div>
);

export default AppPlaceholders;