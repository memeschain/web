import Parse from 'parse';
import moment from 'moment';
import { message } from 'antd';
import { handleParseError } from '../../utils/error-handling';
import MemesChainCore from '../../eth-build/meme';
import SaleClockAuction from '../../eth-build/sale-clock-auction';
import {
    AUCTION_LOADING,
    AUCTION_SUCCESS,
    AUCTION_ERROR,
    GET_PRICE_LOADING,
    GET_PRICE_SUCCESS,
    GET_PRICE_ERROR,
    CREATE_MEME_AUCTION_LOADING,
    CREATE_MEME_AUCTION_SUCCESS,
    CREATE_MEME_AUCTION_ERROR,
    CANCEL_MEME_AUCTION_ERROR,
    CANCEL_MEME_AUCTION_LOADING,
    CANCEL_MEME_AUCTION_SUCCESS,
    AUCTION_DETAILS_INITIAL_STATE,
    BUY_MEME_FROM_AUCTION_LOADING,
    BUY_MEME_FROM_AUCTION_SUCCESS,
    BUY_MEME_FROM_AUCTION_ERROR,
} from '../types';
import web3 from '../../utils/web3';
import { validateProvider } from '../../utils/provider-validate';

export const priceInTwoMinutes = (auction) => {
  const computeCurrentPrice = (
    _startingPrice,
    _endingPrice,
    _duration,
    _secondsPassed,
  ) => {
    if (_secondsPassed >= _duration) {
      // We've reached the end of the dynamic pricing portion
      // of the auction, just return the end price.
      return _endingPrice;
    }

    // Starting price can be higher than ending price (and often is!), so
    // this delta can be negative.
    const totalPriceChange = (_endingPrice) - (_startingPrice);

    const currentPriceChange = totalPriceChange * (_secondsPassed) / (_duration);

    // currentPriceChange can be negative, but if so, will have a magnitude
    // less that _startingPrice. Thus, this result will always end up positive.
    const currentPrice = (_startingPrice) + currentPriceChange;
    return web3.utils.toWei(currentPrice.toString(), 'ether');
  };

  let secondsPassed = 0;
  let twoMinutesFromNow = new Date();
  twoMinutesFromNow.setTime(twoMinutesFromNow.getTime() + 1000 * 120);
  twoMinutesFromNow = parseInt(twoMinutesFromNow.getTime() / 1000, 10);
  const auctionStartedAt = parseInt(auction.startedAt, 10);

  // A bit of insurance against negative values (or wraparound).
  // Probably not necessary (since Ethereum guarnatees that the
  // now variable doesn't ever go backwards).
  if (twoMinutesFromNow > auctionStartedAt) {
    secondsPassed = twoMinutesFromNow - auctionStartedAt;
  }

  return computeCurrentPrice(
    parseFloat(web3.utils.fromWei(auction.startingPrice)),
    parseFloat(web3.utils.fromWei(auction.endingPrice)),
    parseFloat(auction.duration),
    secondsPassed,
  );
};

export const isMemeOnAuctionETH = async (memeId) => {
  try {
    await SaleClockAuction.methods.getAuction(memeId).call();
    return true;
  } catch (e) {
    return false;
  }
};

export const getAuctions = ({ memer = '', offset = 0 } = {}) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_LOADING,
    });
    
    const { data: { result = [], total = 0 } } = await Parse.Cloud.run('get_auctions', { memer, offset });
    
    dispatch({
      type: AUCTION_SUCCESS,
      payload: {
        result,
        total,
      },
    });

  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: AUCTION_ERROR,
      payload: {
        code,
        message,
      },
    });
  }
};

export const getAuctionPrice = ({ memeRefId }) => async (dispatch) => {
  dispatch({
    type: GET_PRICE_LOADING,
    payload: {},
  });

  try {
    const { data: price } = await Parse.Cloud.run('get_price', { memeRefId });
    dispatch({
      type: GET_PRICE_SUCCESS,
      payload: price,
    });
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: GET_PRICE_ERROR,
      payload: {
        code,
        message,
      },
    });
  }
};

export const auctionMeme = ({ memeRefId, memeId, startingPrice, endingPrice, endingAuctionTime }) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_MEME_AUCTION_LOADING,
      payload: {},
    });

    const now = moment(new Date());
    const ending = moment(endingAuctionTime); // Already a moment instance
    const duration = ending.diff(now, 'seconds');
    if (duration < 60) {
      throw new Error('Minimum auction time is 1 minute');
    }

    // This should be the first before any eth call fucntion to be called
    const account = await validateProvider();

    const onAuction = await isMemeOnAuctionETH(memeId);
    if (onAuction) {
      throw new Error('This meme is already on auction. Please refresh this page.');
    }

    // Ignore the coming param of startingPrice because user might have tampered with it
    // using tricks like inspect ele
    const { data: priceAccToVote } = await Parse.Cloud.run('get_price', { memeRefId });

    if (endingPrice > priceAccToVote) {
      throw new Error('Ending price should be less than starting price. If error persists please refresh page.');
    }
    
    await MemesChainCore.methods.createSaleAuction(
      memeId,
      web3.utils.toWei(priceAccToVote.toString(), 'ether'),
      web3.utils.toWei(endingPrice.toString(), 'ether'),
      duration,
    ).send({
      from: account,
      value: web3.utils.toWei('0', 'ether'),
      gasPrice: await web3.eth.getGasPrice(),
    })
    .on('transactionHash', () => message.info('Transaction obtained. Waiting for confirmation. This might take upto 15 seconds...'));

    dispatch({
      type: CREATE_MEME_AUCTION_SUCCESS,
      payload: {},
    });
    
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: CREATE_MEME_AUCTION_ERROR,
      payload: {
        message: e.message ? e.message.split('\n')[0] : message,
      },
    });
  }
}

export const cancelAuction = (memeId) => async (dispatch) => {
  dispatch({
    type: CANCEL_MEME_AUCTION_LOADING,
    payload: {},
  });

  try {
    const onAuction = await isMemeOnAuctionETH(memeId);
    if (!onAuction) {
      throw new Error('This meme is NOT on auction. Please refresh this page.');
    }

    const account = await validateProvider();

    await SaleClockAuction.methods.cancelAuction(memeId).send({
      from: account,
      value: web3.utils.toWei('0', 'ether'),
      gasPrice: await web3.eth.getGasPrice(),
    })
    .on('transactionHash', () => message.info('Transaction obtained. Waiting for confirmation. This might take upto 15 seconds...'));


    dispatch({
      type: CANCEL_MEME_AUCTION_SUCCESS,
      payload: {},
    });

  } catch ({ message = '' }) {
    dispatch({
      type: CANCEL_MEME_AUCTION_ERROR,
      payload: {
        message: message.split('\n')[0],
      },
    });
  }
};


export const buyMeme = ({ auction, memeId }) => async (dispatch) => {
  dispatch({
    type: BUY_MEME_FROM_AUCTION_LOADING,
    payload: {},
  });

  try {
    const onAuction = await isMemeOnAuctionETH(memeId);
    if (!onAuction) {
      throw new Error('This meme is NOT on auction. Please refresh this page.');
    }

    const account = await validateProvider();

    await SaleClockAuction.methods.bid(memeId).send({
      from: account,
      value: (() => {
        // Increasing auction
        if (parseFloat(web3.utils.fromWei((auction.currentPrice))) > parseFloat(web3.utils.fromWei((auction.startingPrice)))) {
          return priceInTwoMinutes(auction);
        }
        return auction.currentPrice;
      })(),
      gasPrice: await web3.eth.getGasPrice(),
    })
    .on('transactionHash', () => message.info('Transaction obtained. Waiting for confirmation. This might take upto 15 seconds...'));

    dispatch({
      type: BUY_MEME_FROM_AUCTION_SUCCESS,
      payload: {},
    });
  } catch ({ message = '' }) {
    dispatch({
      type: BUY_MEME_FROM_AUCTION_ERROR,
      payload: {
        message: message.split('\n')[0],
      },
    });
  }
};

export const renderAuctionDeatilsInitialState = () => (
  { type: AUCTION_DETAILS_INITIAL_STATE, payload: {} }
);