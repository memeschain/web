import { providerNetwork, providerInstalled } from '../../actions/web3-actions';
import { getCurrentUser } from '../../actions/parse-actions';
import web3 from '../web3';

export const validateProvider = async () => {
  const { payload: hasProvider } = providerInstalled();
  if (!hasProvider) {
    throw new Error('Please install Metamask and try again.');
  }

  const [account] = await web3.eth.getAccounts();
  if (!account) {
    throw new Error('Your wallet seems to be locked. Please unlock the wallet and try again');
  }

  const { payload: { username, memer } } = getCurrentUser();
    
  if (username.toLowerCase() !== account.toLowerCase()) {
    // Never split this string error to multiple lines
    throw new Error(
      `Account address for user: ${memer}, is ${username}. Logout from this account or please change your current selected account, from ${account} to ${username}`,
    );
  }

  const { payload: network } = await providerNetwork()(() => {});
  if (!network) {
    // Dont split to new lines here
    throw new Error('You are not on the Main Ethereum network. Please switch to the Main network inside Metamask plugin and try again.');
  }

  return account;
};

