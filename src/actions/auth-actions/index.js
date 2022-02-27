import Parse from 'parse';
import { debounce } from 'underscore';
import { handleParseError } from '../../utils/error-handling/index';
import {
  META_MASK_INSTALLED,
  USER_NAME_VALIDATE,
  USER_SIGNUP_STATUS,
  FIRST_TIME_ERROR,
  FIRST_TIME_LOADING,
  FIRST_TIME_SUCCESS,
  ITERATE_AVATAR,
  RENDER_INITIAL_STATE,
} from '../types';
import {
  hasMetaMask,
  getNetwork,
  getMetaMaskAccount,
 } from '../../service/web3/index';

const debouncedSearch = debounce(async (memer, dispatch) => {
  const { data } = await Parse.Cloud.run('get_user', { memer, bool: true });
  dispatch({
    type: USER_NAME_VALIDATE,
    payload: {
      memername: {
        memer,
        valid: !data,
        searching: false,
      },
    },
  });
}, 1000);

// export const getWeb3 = () => async dispatch => {
//   try {
//     const web3 = await initWeb3();
//     if (web3) {
//       dispatch({ type: WEB_3_STATUS, payload: { web3: true } });
//     } else {
//       dispatch({ type: WEB_3_STATUS, payload: { web3: false } });
//     }
//   } catch (e) {
//     dispatch({ type: WEB_3_STATUS, payload: { web3: false } });
//   }
// };

export const postUser = ({ sign, account, memer: sanMemer, avatar }) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_STATUS,
      payload: {
        loading: true,
      },
    });

    const memer = sanMemer.trim().toLowerCase();
    const { data } = await Parse.Cloud.run('post_user', { sign, account, memer, avatar });
    const sessionToken = data.get('sessionToken');
    await Parse.User.become(sessionToken);
    dispatch({
      type: USER_SIGNUP_STATUS,
      payload: {
        attempted: true,
        status: true,
        loading: false,
      },
    });
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: USER_SIGNUP_STATUS,
      payload: {
        attempted: true,
        status: false,
        loading: false,
        errors: {
          error: true,
          message,
          code,
        },
      },
    });
  }
};

export const getMetaMaskStatus = () => async (dispatch) => {
  if (hasMetaMask()) {
    const { valid: networkValid, name: networkName } = await getNetwork();
    const account = await getMetaMaskAccount();
    dispatch({
      type: META_MASK_INSTALLED,
      payload: {
        loading: false,
        installed: true,
        networkValid,
        networkName,
        account,
      },
    });
  } else {
    dispatch({
      type: META_MASK_INSTALLED,
      payload: {
        loading: false,
        installed: false,
      },
    });
  }
};

export const getFirstTime = (username) => async (dispatch) => {
  dispatch({
    type: FIRST_TIME_LOADING,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await Parse.Cloud.run('get_user', { username, bool: true });

    if (data) {
      dispatch({
        type: USER_NAME_VALIDATE,
        payload: {
          memername: {
            memer: data.memer,
            valid: data || false,
            searching: false,
          },
        },
      });

      dispatch({
        type: FIRST_TIME_SUCCESS,
        payload: {
          ok: true,
          new: false,
          ...data
        }
      });
    } else {
      dispatch({
        type: FIRST_TIME_SUCCESS,
        payload: {
          ok: true,
          new: true,
        }
      });
    }
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: FIRST_TIME_ERROR,
      payload: {
        error: true,
        message,
        code,
      }
    });
  }
}

export const validateMemerName = (memer = '') => async (dispatch) => {
  dispatch({
    type: USER_NAME_VALIDATE,
    payload: {
      memername: {
        memer,
        valid: false,
        searching: true,
      },
    },
  });

  if (memer) {
    if (memer.length <= 3 || memer.length > 32 || !new RegExp('^[a-zA-Z0-9_]+$').test(memer)) {
      dispatch({
        type: USER_NAME_VALIDATE,
        payload: {
          memername: {
            memer,
            valid: false,
            searching: false,
          },
        },
      });
      return false; // Very important here
    }

    try {
      debouncedSearch(memer, dispatch);
    } catch (e) {
      // error
      handleParseError(e);
      dispatch({
        type: USER_NAME_VALIDATE,
        payload: {
          memername: {
            memer,
            valid: false,
            searching: false,
          },
        },
      });
    }
  }
};

export const iterateAvatar = (selected = null) => {
  const avatars = [
    'avatar-1.jpg',
    'avatar-2.jpg',
    'avatar-3.jpg',
    'avatar-4.jpg',
    'avatar-5.jpg',
    'avatar-6.jpg',
    'avatar-7.jpg',
    'avatar-8.jpg',
    'avatar-9.jpg',
    'avatar-10.jpg',
    'avatar-11.jpg',
    'avatar-12.jpg',
  ];

  if (selected) {
    let avatar = avatars.findIndex(e => e === selected);
    avatar === avatars.length - 1 ? avatar = 0 : avatar++;
    return {
      type: ITERATE_AVATAR,
      payload: avatars[avatar],
    };
  }
  return {
    type: ITERATE_AVATAR,
    payload: avatars[Math.floor(Math.random() * 12) + 0],
  };
};

export const revertToInitialState = () => {
  return {
    type: RENDER_INITIAL_STATE,
    payload: {},
  };
};
