import React from 'react';

const EthNotENabled = (props) => {
  return (
    <div className="center-flex margin-large align-center">
      <div className="hero">
          <h1>Oops, you have not enabled Metamask to interact with Memeschain</h1>
          <p style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => window.location.reload()}>
						Please refresh this page and try again
          </p>
      </div>
    </div>
  );
};

export default EthNotENabled;
