import Parse from 'parse';
import { handleParseError } from '../../utils/error-handling';
import {
    POST_VOTE_ERROR,
    POST_VOTE_SUCCESS,
} from '../types';

export const postVote = ({ memeRefId, vote, prevVotingState }) => async (dispatch) => {
  try {
    const type = vote === 'upvote' ? 1 : -1;
    await Parse.Cloud.run('post_vote', { memeRefId, type });
    dispatch({
      type: POST_VOTE_SUCCESS,
      paylaod: {},
    });
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: POST_VOTE_ERROR,
      payload: {
        code,
        message,
        prevVotingState,
      },
    });
  }
};
