import { REQUEST_SUCCESSFULL, ADD_EXPENSES } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  apiReturn: {},
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case REQUEST_SUCCESSFULL:
    return {
      ...state,
      apiReturn: payload,
      currencies: Object.keys(payload).filter((currency) => currency !== 'USDT'),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  default:
    return state;
  }
};

export default walletReducer;
