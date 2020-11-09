import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { modelTypeToModelMap } from 'models/map';
import { API_FIND } from 'actions/api';

const getModelClass = (modelType) => {
  const modelClass = modelTypeToModelMap[modelType];

  if (modelClass) {
    return modelClass;
  }

  throw new Error(`Model ${modelType} does not exist.`);
}

function* fetchOne(action) {
  const { modelType, id, query } = action.payload;
  
  const modelClass = getModelClass(modelType);

  try {
    const { 
      data,
      status,
    } = yield call(modelClass.find.bind(modelClass), id, query);
    debugger
  } catch (e) {
    debugger
  }
}

function* apiSagas() {
  yield takeLatest(API_FIND, fetchOne);
}

export default apiSagas;