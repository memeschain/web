import web3 from '../utils/web3';
import Meme from '../eth-build/build/MemesChainCore.json';

const MemesChainCore = new web3.eth.Contract(
  JSON.parse(Meme.interface),
  process.env.REACT_APP_CONTRACT_ADDRESS,
);


export default MemesChainCore;
