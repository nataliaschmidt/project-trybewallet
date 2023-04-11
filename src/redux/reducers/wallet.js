import { REQUEST_SUCCESSFULL } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case REQUEST_SUCCESSFULL:
    return {
      ...state,
      currencies: Object.keys(payload).filter((currency) => currency !== 'USDT'),
    };
  default:
    return state;
  }
};

export default walletReducer;
