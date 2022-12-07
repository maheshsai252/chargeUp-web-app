import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'

import profile from '../reducers/userReducer';
import tabReducer from '../reducers/tabReducer';

const rootReducer = combineReducers({
  user: profile,
  tab: tabReducer
});

// const configureStore = () => {
//   return createStore(
//     rootReducer,

//     compose(applyMiddleware(thunk))
//   );
// };
const store = configureStore({ reducer: rootReducer })

export default store;