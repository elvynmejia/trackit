import { spawn } from 'redux-saga/effects'

import { sagas } from 'components/leads/stage_details';


function* componentSagas() {
  yield spawn(sagas);
}

export default componentSagas;
