import {
  PROVIDER_INSTALLED,
  PROVIDER_CURRENT_ACCOUNT,
  PROVIDER_UNLOCKED,
  PROVIDER_NETWORK,
  WEB3_LOADING,
	PROVIDER_ENABLED,
} from '../../actions/types';

const INITIAL_STATE = {
  web3: {
    loading: true,
    installed: false,
    network: false,
    unlocked: false,
    account: '',
		enabled: false
  },
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case WEB3_LOADING:
      return {
        ...state,
        web3: {
          ...state.web3,
          loading: true,
        }
      };
    case PROVIDER_INSTALLED:
      return {
        ...state,
        web3: {
          ...state.web3,
          loading: false,
          installed: payload
        }
      };
    case PROVIDER_NETWORK:
      return {
        ...state,
        web3: {
          ...state.web3,
          loading: false,
          network: payload,
        }
      };
    case PROVIDER_UNLOCKED:
      return {
        ...state,
        web3: {
          ...state.web3,
          loading: false,
          unlocked: payload
        }
      };
    case PROVIDER_CURRENT_ACCOUNT:
    return {
      ...state,
      web3: {
        ...state.web3,
        loading: false,
        account: payload
      }
    };
		case PROVIDER_ENABLED:
			return {
				...state,
				web3: {
					...state.web3,
					loading: false,
					enabled: payload
				}
			}
    default:
      return { ...state };
  }
};

