import {
  POST_VOTE_ERROR,
  POST_VOTE_SUCCESS,
} from '../../actions/types';

const INITIAL_STATE = {
  votingErrors: {
    error: false,
    prevVotingState: false,
    code: '',
    message: '',
  },
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case POST_VOTE_SUCCESS:
      return {
        ...state,
        votingErrors: {
          ...state.errors,
          error: false,
        },
      };
    case POST_VOTE_ERROR:
      return {
        ...state,
        votingErrors: {
          ...state.errors,
          error: true,
          ...payload,
        },
      };
    default:
      return { ...state };
  }
};
