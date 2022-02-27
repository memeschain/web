import web3 from '../utils/web3';
import SaleClockAuctionJSON from '../eth-build/build/SaleClockAuction.json';

const SaleClockAuction = new web3.eth.Contract(
  JSON.parse(SaleClockAuctionJSON.interface),
  process.env.REACT_APP_SALE_CLOCK_AUCTION_ADDRESS,
);

export default SaleClockAuction;
