import React from 'react';
import { Button } from 'antd';

const NoMetaMask = () => {
  const metaMaskAddress = typeof InstallTrigger !== 'undefined' ? (
    'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
  ) : 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';
  
  return (
    <div className="center-flex margin-large align-center">
      <div className="hero">
        <h1>Wanna meme?</h1>
        <p>
          You’ll need a safe place to store all of your creative dank memes!
          The perfect place is in a secure wallet like MetaMask.
          This will also act as your login (no extra password needed).
        </p>
          <a
            href={metaMaskAddress}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="primary app-primary-large" size="large">
              Install Metamask
            </Button>
          </a>
      </div>
    </div>
  );
};

export default NoMetaMask;
