import { combineReducers } from 'redux';
import auth from './auth.reducer';
import user from './user.reducer';
import discovery from './discovery.reducer';
import overview from './overview.reducer';
import search from './search.reducer';
import modals from './modals.reducer';

const app = combineReducers({
  discovery,
  overview,
  search,
  modals,
});

export default combineReducers({
  app,
  user,
  auth,
});
