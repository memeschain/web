import {
  GET_MEMES_LOADING,
  GET_MEMES_SUCCESS,
  GET_MEMES_ERROR,
} from '../../actions/types';

const INITIAL_STATE = {
  memes: {
    loading: true,
    success: {
      ok: false,
      data: [],
      total: 0,
    },
    errors: {
      error: false,
      message: '',
    },
  },
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_MEMES_LOADING:
      return {
        ...state,
        memes: {
          ...state.memes,
          loading: true,
        },
      };
    case GET_MEMES_SUCCESS:
      return {
        ...state,
        memes: {
          ...state.memes,
          loading: false,
          success: {
            ...state.memes.success,
            ok: true,
            data: payload.result,
            total: payload.total,
          },
          errors: {
            ...state.memes.errors,
            ...INITIAL_STATE.memes.errors,
          },
        },
      };
    case GET_MEMES_ERROR:
      return {
        ...state,
        memes: {
          ...state.memes,
          loading: false,
          errors: {
            ...state.memes.errors,
            ...payload,
          },
          success: {
            ...state.memes.success,
            ...INITIAL_STATE.memes.success,
          },
        },
      };
    default:
      return { ...state };
  }
};

