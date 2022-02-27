import Parse from 'parse';
import { handleParseError } from '../../utils/error-handling/index';
import {
  GET_MEMER_LOADING,
  GET_MEMER_SUCCESS,
  GET_MEMER_ERROR
} from '../types';

export const getMemer = ({ memer }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MEMER_LOADING,
      payload: {
        loading: true,
      },
    });

    const { data } = await Parse.Cloud.run('get_user', { memer });
    if (data) {
      dispatch({
        type: GET_MEMER_SUCCESS,
        payload: {
          ok: true,
          ...data,
        },
      });
    }
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: GET_MEMER_ERROR,
      payload: {
        error: true,
        code,
        message,
      },
    });
  }
};
