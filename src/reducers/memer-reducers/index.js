import {
  GET_MEMER_LOADING,
  GET_MEMER_SUCCESS,
  GET_MEMER_ERROR,
  MEMER_MEMES_COUNT,
} from '../../actions/types';

const INITIAL_STATE = {
  memer: {
    loading: true,
    success: {
      ok: false,
    },
    errors: {
      error: false,
      message: '',
    }
  },
  ownedMemeCount: 0,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_MEMER_LOADING:
      return {
        ...state,
        memer: {
          ...state.memer,
          loading: true,
        }
      };
    case GET_MEMER_SUCCESS:
      return {
        ...state,
        memer: {
          ...state.memer,
          loading: false,
          success: {
            ...state.memer.success,
            ...payload,
          }
        }
      };
    case GET_MEMER_ERROR:
      return {
        ...state,
        memer: {
          ...state.memer,
          loading: false,
          errors: {
            ...state.memer.errors,
            ...payload,
          }
        }
      }
    
    case MEMER_MEMES_COUNT:
      return {
        ...state,
        ownedMemeCount: payload,
      }
    default:
      return { ...state };
  }
};

