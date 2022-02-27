import {
  META_MASK_INSTALLED,
  USER_NAME_VALIDATE,
  USER_SIGNUP_STATUS,
  FIRST_TIME_ERROR,
  FIRST_TIME_SUCCESS,
  FIRST_TIME_LOADING,
  ITERATE_AVATAR,
  RENDER_INITIAL_STATE,
} from '../../actions/types';

const INITIAL_STATE = {
  web3: false,
  metaMaskStatus: {
    loading: true,
    installed: false,
    networkValid: false,
    networkName: 'Test',
    account: [],
  },
  auth: {
    memername: {
      memer: '',
      valid: false,
      searching: false,
    },
    new: {
      loading: true,
      success: {
        ok: false,
        new: false,
        memer: '',
        username: '',
      },
      errors: {
        error: false,
        message: '',
      }
    }
  },
  signup: {
    loading: false,
    attempted: false,
    status: false,
    errors: {
      error: false,
      message: '',
    }
  },
  avatar: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // case WEB_3_STATUS:
    //   return { ...state, web3: action.payload.web3 };
    case META_MASK_INSTALLED:
      return { ...state, metaMaskStatus: payload };
    case USER_NAME_VALIDATE:
      return { ...state, auth: { ...state.auth, ...payload } };
    case USER_SIGNUP_STATUS:
      return { ...state, signup: payload };
    case FIRST_TIME_LOADING:
      return {
        ...state,
        auth: {
          ...state.auth,
          new: {
            ...state.auth.new,
            ...payload,
          }
        }
      }
    case FIRST_TIME_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          new: {
            ...state.auth.new,
            loading: false,
            success: {
              ...state.auth.new.success,
              ...payload,
            }
          }
        }
      }
    
    case FIRST_TIME_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          new: {
            ...state.auth.new,
            loading: false,
            errors: {
              ...state.auth.new.errors,
              ...payload
            }
          }
        }
      }
    
    case ITERATE_AVATAR:
      return {
        ...state,
        avatar: payload
      };
    
    case RENDER_INITIAL_STATE:
      return INITIAL_STATE;
      
    default:
      return { ...state };
  }
};

