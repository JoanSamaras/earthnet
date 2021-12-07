import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import actionsReducer from './actions';
import { esaAPI } from '../slices/api';

export default history =>
  combineReducers({
    router: connectRouter(history),
    state: actionsReducer,
    [esaAPI.reducerPath]: esaAPI.reducer
  });
