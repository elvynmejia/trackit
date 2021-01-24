import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as serverSide } from './actions/api';
import { reducer as clientSide } from './actions/model';
import { reducer as requests } from './actions/requests';
import { reducer as interfaces } from './actions/interfaces';


// import apiSagas from './sagas/api';
import rootSaga from './sagas';

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
    interfaces,
  }),
  {},
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
    ),
  )
);

sagaMiddleware.run(rootSaga);

export default store;
