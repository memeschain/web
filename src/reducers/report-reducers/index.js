import {
  REPORT_ERROR,
  REPORT_LOADING,
  REPORT_SUCCESS,
  REPORT_TEXT_UPDATE,
  REPORT_VISIBILITY,
} from '../../actions/types';

const INITIAL_STATE = {
  report: {
    loading: false,
    text: '',
    success: {
      ok: false,
      data: null,
    },
    errors: {
      error: false,
      message: '',
    }
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REPORT_LOADING:
      return {
        ...state,
        memes: {
          ...state.report,
          loading: true,
        }
      };
    case REPORT_SUCCESS:
      return {
        ...state,
        report: {
          ...state.report,
          loading: false,
          errors: {
            ...state.report.errors,
            error: false,
          },
          success: {
            ...state.report.success,
            ...payload,
          }
        }
      };
    case REPORT_ERROR:
      return {
        ...state,
        report: {
          ...state.report,
          loading: false,
          success: {
            ...state.report.success,
            ok: false,
          },
          errors: {
            ...state.report.errors,
            ...payload,
          }
        }
      }
    case REPORT_TEXT_UPDATE:
      return {
        ...state,
        report: {
          ...state.report,
          loading: false,
          text: payload,
        }
      }
    case REPORT_VISIBILITY:
      return {
        ...state,
        report: {
          ...state.report,
          visibility: payload
        }
      }
    default:
      return { ...state };
  }
};

