import { REQUEST_SUCCESSFULL,
  ADD_EXPENSES,
  DELETE_EXPENSE,
  EXPENSE_FOR_EDIT,
  UPPDATE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  apiReturn: {},
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: payload,
    };
  case EXPENSE_FOR_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: payload,
    };
  case UPPDATE_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
