import Parse from 'parse';
import {
  GET_CURRENT_USER,
} from '../types';

export const getCurrentUser = () => {
  const user = Parse.User.current() && Parse.User.current().toJSON();
  return {
    type: GET_CURRENT_USER,
    payload: user,
  };
};
