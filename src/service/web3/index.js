import Web3 from 'web3';
import web3 from '../../utils/web3';

export const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
      if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider);  
        resolve(true);  
      } else {
        window.web3 = undefined;
        resolve(true);
      }
    });
  })
};

export const hasMetaMask = () => {
  if (window.web3 && window.web3.currentProvider && window.web3.currentProvider.isMetaMask) {
    return true;
  }
  return false;
};

export const getNetwork = () => {
    return new Promise((resolve) => {
      if (web3.eth.defaultChain) {
				switch (web3.eth.defaultChain) {
					case 'main': // main network
						resolve({ valid: true, name: 'Main' });
						break;
					default:
						resolve({ valid: false, name: type });
						break;
				}
      } else {
        resolve({ valid: false, name: 'Unknown / Test' });
      }
    });
};

export const getMetaMaskAccount = () => {
  return new Promise((resolve) => {
    web3.eth.getAccounts((err, accounts) => {
			if (err) {
				resolve([]);
			}
			accounts.length ? resolve([accounts[0]]) : resolve([]);
		});
  });
};


// return new Promise((resolve, reject) => {
//   window.web3.currentProvider.sendAsync({
//     method: 'eth_signTypedData',
//     params: [data, account],
//     account,
//   }, (err, ({ error, result })) => {
//     if (err) {
//       reject(err);
//     }
//     if (error) {
//       reject(error.message);
//     }
//     resolve(result);
//   });
// });
export const generateMetaMaskSign = (account, data) => {
  return new Promise((resolve, reject) => {
    window.web3.currentProvider.sendAsync({
      method: 'eth_signTypedData',
      params: [data, account],
      account,
    }, (err, { error, result }) => {
      if (err) {
        reject(err);
      }
      if (error) {
        reject(error.message);
      }
      resolve(result);
    });
  });
};
