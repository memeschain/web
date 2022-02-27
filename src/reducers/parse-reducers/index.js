import {
  GET_CURRENT_USER,
} from '../../actions/types';

const INITIAL_STATE = {
  currentUser: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return { ...state };
  }
};

