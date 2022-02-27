import Parse from 'parse';
import { handleParseError } from '../../utils/error-handling/index';
import {
  REPORT_LOADING,
  REPORT_SUCCESS,
  REPORT_ERROR,
  REPORT_TEXT_UPDATE,
  REPORT_VISIBILITY,
} from '../types';

export const postReport = ({ report = "", data = {}, meme }) => async (dispatch) => {
  try {
    dispatch({
      type: REPORT_LOADING,
      payload: {
        loading: true,
      },
    });

    const file = meme ? await meme.save() : undefined;

    const { data: response } = await Parse.Cloud.run('post_report', { report, data, file });
    if (response) {
      dispatch({
        type: REPORT_SUCCESS,
        payload: {
          ok: true,
          response,
        },
      });
    }
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: REPORT_ERROR,
      payload: {
        error: true,
        code,
        message,
      },
    });
  }
};


export const onReportTextChanged = (text) => {
  return {
    type: REPORT_TEXT_UPDATE,
    payload: text,
  }
};

export const reportVisibility = (visibility) => {
  return {
    type: REPORT_VISIBILITY,
    payload: visibility,
  }
};