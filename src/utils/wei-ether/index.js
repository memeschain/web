import web3 from '../web3';

export const weiToFixedEther = ({ fixed = 5, wei = '0' }) => {
  const currentPriceStr = web3.utils.fromWei(wei);
  const fixedDecimal = (currentPriceStr.split('.')[1] || '').slice(0, fixed);
  return `${currentPriceStr.split('.')[0]}.${fixedDecimal || '0'}`;
};
