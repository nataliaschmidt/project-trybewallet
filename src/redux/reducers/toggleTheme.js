import { TOGGLE_THEME } from '../actions';

const INITIAL_STATE = {
  theme: 'light',
};

const toggleTheme = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOGGLE_THEME:
    return {
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    };
  default:
    return state;
  }
};

export default toggleTheme;
