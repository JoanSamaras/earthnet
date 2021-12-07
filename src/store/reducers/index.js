import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import actionsReducer from './actions';
import wellsReducer from '../slices/wells';
import logsReducer from '../slices/logs';
import formationsReducer from '../slices/formations';
import { esaAPI } from '../slices/api';

export default history =>
  combineReducers({
    router: connectRouter(history),
    state: actionsReducer,
    wells: wellsReducer,
    logs: logsReducer,
    formations: formationsReducer,
    [esaAPI.reducerPath]: esaAPI.reducer
  });
