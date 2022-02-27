import { combineReducers } from 'redux';
import authReducers from './auth-reducers/index';
import memerReducers from './memer-reducers';
import parseReducers from './parse-reducers';
import memeCreationReducers from './meme-creation-reducers';
import web3Reducers from './web3-reducers';
import memesReducers from './memes-reducers';
import memeReducers from './meme-reducers';
import reportReducers from './report-reducers';
import auctionReducers from './auction-reducers';
import votesReducers from './vote-reducers';

export default combineReducers({
  authReducers,
  memerReducers,
  parseReducers,
  memeCreationReducers,
  web3Reducers,
  memesReducers,
  memeReducers,
  reportReducers,
  auctionReducers,
  votesReducers,
});

