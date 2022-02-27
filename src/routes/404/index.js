import React from 'react';
import AppPlaceholders from '../../components/app-placeholders';
import placeholder from '../../images/placeholders/404.svg';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const FourOFour = () => (
  <React.Fragment>
    <AppPlaceholders
      upper="Oh! This page does not exist! 404"
      src={placeholder}
    >
      <Link to="/">
        <Button
          type="primary"
          size="large"
          className="app-primary-large"
        >
          Home 
        </Button>
      </Link>
    </AppPlaceholders>
  </React.Fragment>
);

export default FourOFour;