import {
  GET_MEME_LOADING,
  GET_MEME_SUCCESS,
  GET_MEME_ERROR,
  GET_MEME_INITIAL_STATE,
} from '../../actions/types';

const INITIAL_STATE = {
  meme: {
    loading: true,
    success: {
      ok: false,
    },
    errors: {
      error: false,
      message: '',
    }
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_MEME_LOADING:
      return {
        ...state,
        meme: {
          ...state.meme,
          loading: true,
        }
      };
    case GET_MEME_SUCCESS:
      return {
        ...state,
        meme: {
          ...state.meme,
          loading: false,
          success: {
            ...state.meme.success,
            ...payload,
          }
        }
      };
    case GET_MEME_ERROR:
      return {
        ...state,
        meme: {
          ...state.meme,
          loading: false,
          errors: {
            ...state.meme.errors,
            ...payload,
          }
        }
      }
    case GET_MEME_INITIAL_STATE:
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};

