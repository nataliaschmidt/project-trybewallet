// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_USER_INFOS } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case ADD_USER_INFOS:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
};

export default userReducer;
