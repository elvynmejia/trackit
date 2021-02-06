import { spawn } from 'redux-saga/effects'

// import { sagas as stageDetailsSaga } from 'components/leads/stage_details';
import { sagas as stageDetailsSagas } from 'components/stages/details_modal';

import { sagas as addLeadSaga } from 'components/leads/add_lead';


function* componentSagas() {
  // yield spawn(stageDetailsSaga);
  yield spawn(stageDetailsSagas);
  yield spawn(addLeadSaga);
}

export default componentSagas;
