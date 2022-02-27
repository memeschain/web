import Parse from 'parse';
import { handleParseError } from '../../utils/error-handling/index';
import {
  GET_MEME_LOADING,
  GET_MEME_SUCCESS,
  GET_MEME_ERROR,
  GET_MEME_INITIAL_STATE,
} from '../types';

export const getMeme = ({ meme }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MEME_LOADING,
      payload: {
        loading: true,
      },
    });

    const { data } = await Parse.Cloud.run('get_meme', { meme });
    if (data) {
      dispatch({
        type: GET_MEME_SUCCESS,
        payload: {
          ok: true,
          ...data,
        },
      });
    }
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: GET_MEME_ERROR,
      payload: {
        error: true,
        code,
        message,
      },
    });
  }
};

export const getMemeInitialState = () => ({ type: GET_MEME_INITIAL_STATE, payload: {} });
