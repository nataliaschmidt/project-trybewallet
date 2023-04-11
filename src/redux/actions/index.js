// Coloque aqui suas actions
export const ADD_USER_INFOS = 'ADD_USER_INFOS';

export const addUserInfosAction = (email) => ({
  type: ADD_USER_INFOS,
  payload: {
    email,
  },
});
