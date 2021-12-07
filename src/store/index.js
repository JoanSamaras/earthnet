import createRootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import history from '../history';
import { esaAPI } from './slices/api';

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(esaAPI.middleware),
})

setupListeners( store.dispatch )

export default store;
