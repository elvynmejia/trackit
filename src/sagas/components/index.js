import { spawn } from 'redux-saga/effects'

import { sagas as stageDetailsSaga } from 'components/leads/stage_details';
import { sagas as addLeadSaga } from 'components/leads/add_lead';


function* componentSagas() {
  yield spawn(stageDetailsSaga);
  yield spawn(addLeadSaga);
}

export default componentSagas;
