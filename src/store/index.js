import createRootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import history from '../history';
import { esaAPI } from './slices/api';

// On browser refresh we normally choose to start with a clear state. Here, we use material-ui ListItem as "a"
// causing a reload when we navigate to a page and by default redux does not persist the state on refresh. We
// could either turn the ListItem component to NavLink (the way it's used to redirect to the homepage) or we
// could persist the state in sessionStorage (or in localStorage if we need the state to exist after we 
// terminate the session - or have it loaded in another session as well) and here, the latter was chosen.

const loadState = () => {
  try {
    let serializedState = sessionStorage.getItem("earthnet");

    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch (err) {
    return undefined;
  }
}

const saveState = ( state ) => {
  let serializedState = JSON.stringify(state);
  sessionStorage.setItem("earthnet", serializedState);
}

const store = configureStore({
  reducer: createRootReducer(history),
  preloadedState: loadState(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(esaAPI.middleware),
})

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
