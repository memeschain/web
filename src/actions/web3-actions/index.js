import {
  PROVIDER_INSTALLED,
  PROVIDER_NETWORK,
  PROVIDER_UNLOCKED,
  PROVIDER_CURRENT_ACCOUNT,
  WEB3_LOADING,
	PROVIDER_ENABLED
} from '../types/index';

import web3 from '../../utils/web3';

export const providerInstalled = () => {
  if (window.web3 && window.web3.currentProvider) {
    return {
      type: PROVIDER_INSTALLED,
      payload: true,
    }
  }
  return {
    type: PROVIDER_INSTALLED,
    payload: false,
  } ;
};

export const providerEnabled = () => async (dispatch) => {
  if (window.ethereum) {
		try {
			const status = await window.ethereum.enable();
			console.log(status)
			if (status) {
				dispatch({
					type: PROVIDER_ENABLED,
					payload: status,
				});
				return { type: PROVIDER_ENABLED, payload: status };
			} else {
				throw "Permission error";
			}	
		} catch (e) {
			dispatch({
				type: PROVIDER_ENABLED,
				payload: false,
			});
			return { type: PROVIDER_ENABLED, payload: false };
		}
	} else {
		dispatch({
			type: PROVIDER_ENABLED,
			payload: false,
		});
		return { type: PROVIDER_ENABLED, payload: false };
	}
};


export const providerNetwork = () => async (dispatch) => {
  if (window.ethereum) {
    try {
      dispatch({
        type: WEB3_LOADING,
        payload: {}
      });
      const network = window.ethereum.networkVersion;//await web3.eth.net.getNetworkType();
      switch (network.trim().toLowerCase()) {
        case process.env.REACT_APP_WEB3_NETWORK:
          dispatch({
            type: PROVIDER_NETWORK,
            payload: true  
          });
          return { type: PROVIDER_NETWORK, payload: true };
        default:
          dispatch({
            type: PROVIDER_NETWORK,
            payload: false,
          });
          return { type: PROVIDER_NETWORK, payload: false };
      }
    } catch (e) {
      dispatch({
        type: PROVIDER_NETWORK,
        payload: false 
      });
      return { type: PROVIDER_NETWORK, payload: false };
    }
  } else {
    dispatch({
      type: PROVIDER_NETWORK,
      payload: false 
    });
    return { type: PROVIDER_NETWORK, payload: false };
  }
};

export const providerUnLocked = () => async (dispatch) => {
  if (window.ethereum) {
    try {
      dispatch({
        type: WEB3_LOADING,
        payload: {}
      });
      const [ account ] = await web3.eth.getAccounts();
      dispatch({
        type: PROVIDER_UNLOCKED,
        payload: account || false 
      });
    } catch (e) {
      dispatch({
        type: PROVIDER_UNLOCKED,
        payload: false 
      });
    }
  } else {
    dispatch({
      type: PROVIDER_UNLOCKED,
      payload: false 
    });
  }
}

export const providerCurrentAccount = () => async (dispatch) => {
  if (window.ethereum) {
    try {
      const [ account ] = await web3.eth.getAccounts();
      if (!account) {
        dispatch({
          type: PROVIDER_CURRENT_ACCOUNT,
          payload: false 
        });
        return false;
      }
      dispatch({
        type: PROVIDER_CURRENT_ACCOUNT,
        payload: account 
      });
      return account;
    } catch (e) {
      dispatch({
        type: PROVIDER_CURRENT_ACCOUNT,
        payload: false 
      });
      return false;
    }
    
  } else {
    dispatch({
      type: PROVIDER_CURRENT_ACCOUNT,
      payload: false 
    });
    return false;
  }
};


export const generateMetaMaskSign = (account, data) => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
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
