import React from 'react';
import network from '../../../images/faq/main-network.png';

const BadMetaMaskNetwork = (props) => {
  return (
    <div className="center-flex margin-large align-center">
      <div className="hero">
          <h1>Oops, you’re on the wrong network</h1>
          <p>
            Simply open MetaMask and switch over to the <strong>Main Ethereum Network.</strong>
          </p>
          <img src={network} alt="Metamask network is invalid"/>
      </div>
    </div>
  );
};

export default BadMetaMaskNetwork;
