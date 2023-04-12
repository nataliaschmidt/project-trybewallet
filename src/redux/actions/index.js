import fetchCurrency from '../../helpers/fetchCurrency';

export const ADD_USER_INFOS = 'ADD_USER_INFOS';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFULL = 'REQUEST_SUCCESSFULL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const ADD_EXPENSES = 'ADD_EXPENSES';

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

const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  error,
});

export const resolveFetchCurrency = () => async (dispatch) => {
  try {
    dispatch(requestStarted());
    const data = await fetchCurrency();
    dispatch(requestSuccessfull(data));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});
