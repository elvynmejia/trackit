import { call, put, takeEvery, select } from 'redux-saga/effects'
import { normalize, schema } from 'normalizr';

import { modelTypeToModelMap } from 'models/map';
import {
  API_FIND,
  API_CREATE,
  API_FIND_ALL,
  API_UPDATE,
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

    const entity = new schema.Entity(modelType, {}, { idAttribute: 'public_id' });

    const normalizedData = normalize(Object.values(data)[0], entity);
    const responseIds = normalizedData.result;
    debugger
    yield put(apiReceive({
      modelType,
      responseData: normalizedData.entities,
      requestId,
    }));

    yield put(apiSuccess({
      modelType,
      status,
      requestId,
      responseIds,
    }));
  } catch (e) {
    const { status, data } = e?.response;
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

    const entity = new schema.Entity(modelType, {}, { idAttribute: 'public_id' });

    const normalizedData = normalize(Object.values(data)[0], [entity]);
    debugger
    yield put(apiReceive({
      modelType,
      responseData: normalizedData.entities,
      requestId,
    }));

    const responseIds = normalizedData.result;

    yield put(apiSuccess({
      modelType,
      status,
      requestId,
      responseIds
    }));
  } catch (e) {
    const { status, data } = e?.response;
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

function* create(action) {
  const { modelType, requestId } = action.payload;

  const body = yield select(state => state.clientSide[modelType]?.[requestId] || {})

  const modelClass = getModelClass(modelType);

  try {
    const { data, status } = yield call(modelClass.create.bind(modelClass), body);

    const entity = new schema.Entity(modelType, {}, { idAttribute: 'public_id' });

    const normalizedData = normalize(Object.values(data)[0], entity);
    const responseIds = normalizedData.result;
    yield put(apiReceive({
      modelType,
      responseData: normalizedData.entities,
      requestId,
    }));

    yield put(apiSuccess({
      modelType,
      status,
      requestId,
      responseIds,
    }));
  } catch (e) {
    const { status, data } = e?.response;
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

function* update(action) {
  const { id, modelType, requestId } = action.payload;
  const body = yield select(state => {
    return state.clientSide[modelType]?.[requestId] || {}
  });

  const modelClass = getModelClass(modelType);

  try {
    const {
      data,
      status
    } = yield call(modelClass.update.bind(modelClass), id, body);
    const entity = new schema.Entity(modelType, {}, { idAttribute: 'public_id' });

    const normalizedData = normalize(Object.values(data)[0], entity);
    const responseIds = normalizedData.result;

    yield put(apiReceive({
      modelType,
      responseData: normalizedData.entities,
      requestId,
    }));

    yield put(apiSuccess({
      modelType,
      status,
      requestId,
      responseIds,
    }));
  } catch (e) {
    const { status, data } = e?.response;
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
  yield takeEvery(API_CREATE, create);
  yield takeEvery(API_UPDATE, update);
}

export default apiSagas;
