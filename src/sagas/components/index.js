import { spawn } from 'redux-saga/effects'

import { sagas as stageDetailsSagas } from 'components/stages/details_modal';

import { sagas as addLeadSaga } from 'components/leads/add_lead';
import { sagas as editLeadSaga } from 'components/leads/edit';


function* componentSagas() {
  yield spawn(stageDetailsSagas);
  yield spawn(addLeadSaga);
  yield spawn(editLeadSaga);
}

export default componentSagas;
