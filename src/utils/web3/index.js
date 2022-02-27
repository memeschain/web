import Web3 from 'web3';
let web3;
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    process.env.REACT_APP_INFURA_URL
  );
  web3 = new Web3(provider); 
}
export default web3;