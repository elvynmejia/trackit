import { spawn } from 'redux-saga/effects'

import apiSagas from 'sagas/api';
import componentSagas from 'sagas/components';

export default function* rootSaga() {
  yield spawn(apiSagas);
  yield spawn(componentSagas);
}
