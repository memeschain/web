import Parse from 'parse';
import { handleParseError } from '../../utils/error-handling/index';
import {
  GET_MEMES_LOADING,
  GET_MEMES_SUCCESS,
  GET_MEMES_ERROR,
  MEMER_MEMES_COUNT,
} from '../types';

export const getMemes = ({ memer, offset = 0 } = {}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MEMES_LOADING,
      payload: {
        loading: true,
      },
    });

    const { data: { result = [], total } } = await Parse.Cloud.run('get_memes', { memer, offset, order: 'desc' });
    dispatch({
      type: GET_MEMES_SUCCESS,
      payload: {
        result,
        total,
      },
    });

    dispatch({
      type: MEMER_MEMES_COUNT,
      payload: total,
    });
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: GET_MEMES_ERROR,
      payload: {
        error: true,
        code,
        message,
      },
    });
  }
};
