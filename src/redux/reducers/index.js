import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import toggleTheme from './toggleTheme';

const rootReducer = combineReducers({
  user,
  wallet,
  toggleTheme,
});

export default rootReducer;
