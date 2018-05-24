import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './login';
import repos from './repos';
import commits from './commits';

export default combineReducers({
  routing: routerReducer,
  auth,
  repos,
  commits,
});
