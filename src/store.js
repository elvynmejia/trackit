import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { reducer as serverSide } from './actions/api';
import { reducer as clientSide } from './actions/model';
import { reducer as requests } from './actions/requests';

import apiSagas from './sagas/api';

export const initialState = {
  current_user: () => 'CURRENT_USER',
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	combineReducers({
    ...initialState,
    serverSide,
    clientSide,
    requests,
  }), 
	{},
  compose(
    applyMiddleware(
    	sagaMiddleware,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(apiSagas);

export default store;