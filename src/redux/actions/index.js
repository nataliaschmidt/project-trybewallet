import fetchCurrency from '../../helpers/fetchCurrency';

export const ADD_USER_INFOS = 'ADD_USER_INFOS';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFULL = 'REQUEST_SUCCESSFULL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EXPENSE_FOR_EDIT = 'EXPENSE_FOR_EDIT ';
export const UPPDATE_EXPENSE = 'UPPDATE_EXPENSE';
export const TOGGLE_THEME = 'TOGGLE_THEME';

export const addUserInfosAction = (email) => ({
  type: ADD_USER_INFOS,
  payload: {
    email,
  },
});

const requestStarted = () => ({
  type: REQUEST_STARTED,
});

const requestSuccessfull = (data) => ({
  type: REQUEST_SUCCESSFULL,
  payload: data,

});

export const resolveFetchCurrency = () => async (dispatch) => {
  dispatch(requestStarted());
  const data = await fetchCurrency();
  dispatch(requestSuccessfull(data));
};

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const deleteExpenseAction = (expenses) => ({
  type: DELETE_EXPENSE,
  payload: expenses,
});

export const expenseForEditAction = (expense) => ({
  type: EXPENSE_FOR_EDIT,
  payload: expense,
});

export const uppdateExpanseAction = (newExpenses) => ({
  type: UPPDATE_EXPENSE,
  payload: newExpenses,
});

export const toggleThemeAction = () => ({
  type: TOGGLE_THEME,
});
