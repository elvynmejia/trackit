import { call, put, takeEvery } from 'redux-saga/effects'
import { normalize, schema } from 'normalizr';

import { modelTypeToModelMap } from 'models/map';
import {
  API_FIND,
  API_FIND_ALL,
  apiReceive,
} from 'actions/api';

import {
  apiSuccess,
  apiError,
} from 'actions/requests';

const getModelClass = (modelType) => {
  const modelClass = modelTypeToModelMap[modelType];

  if (modelClass) {
    return modelClass;
  }

  throw new Error(`Model ${modelType} does not exist.`);
}

function* find(action) {
  const { modelType, id, query, requestId } = action.payload;

  const modelClass = getModelClass(modelType);

  try {
    const { data, status } = yield call(modelClass.find.bind(modelClass), id, query);

    const leads = new schema.Entity(modelType);

    const normalizedData = normalize(Object.values(data)[0], leads);

    yield put(apiReceive(
      modelType,
      normalizedData.entities,
      requestId,
    ));

    yield put(apiSuccess({
      modelType,
      status,
      requestId,
    }));
  } catch (e) {
    const { status, data } = e.response;
    const { message } = data;
    yield put(apiError({
      modelType,
      status,
      requestId,
      message,
      ...data,
    }));
  }
}

function* findAll(action) {
  const { modelType, query, requestId } = action.payload;

  const modelClass = getModelClass(modelType);

  try {
    const { data, status } = yield call(modelClass.findAll.bind(modelClass), query);

    const leads = new schema.Entity(modelType);

    const normalizedData = normalize(Object.values(data)[0], [leads]);

    yield put(apiReceive(
      modelType,
      normalizedData.entities,
      requestId,
    ));

    yield put(apiSuccess({
      modelType,
      status,
      requestId,
    }));
  } catch (e) {
    const { status, data } = e.response;
    const { message } = data;
    yield put(apiError({
      modelType,
      status,
      requestId,
      message,
      ...data,
    }));
  }

}

function* apiSagas() {
  yield takeEvery(API_FIND, find);
  yield takeEvery(API_FIND_ALL, findAll);
}

export default apiSagas;