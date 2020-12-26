import { put, takeEvery, take } from 'redux-saga/effects'

import { uuid } from 'uuidv4';
import { get } from 'lodash';

import { API_ERROR } from 'actions/requests';

const getRequestId = () => uuid();
const uniqueRecordId = () => uuid();

export const API_RECEIVE = 'api/receive';
export const apiReceive = ({ modelType, responseData = {}, requestId } = {}) => ({
  type: API_RECEIVE,
  payload: {
    modelType,
    responseData,
    requestId,
  },
});

// findbyId
export const API_FIND = 'api/find';
export const find = ({ modelType, id, query = {}, requestId = getRequestId() } = {}) => ({
  type: API_FIND,
  payload: {
    modelType,
    id,
    query,
    requestId
  },
});

export const API_FIND_ALL = 'api/find_all';
export const findAll = ({ modelType, query = {}, requestId = getRequestId() } = {}) => ({
  type: API_FIND_ALL,
  payload: {
    modelType,
    query,
    requestId,
  },
});

export const API_CREATE = 'ap i/create';
export const create = ({ modelType, data, requestId = getRequestId() } = {}) => ({
  type: API_CREATE,
  payload: {
    modelType,
    data,
    requestId,
  },
});

export const API_UPDATE = 'api/update';
export const update = ({ id, modelType, data, requestId = getRequestId() } = {}) => ({
  type: API_UPDATE,
  payload: {
    id,
    modelType,
    data,
    requestId,
  },
});

export function* callApiAndWait(action) {
  yield put(action);
  while(true) {
    const response = yield take([API_RECEIVE, API_ERROR]);
    if (response.payload.requestId === action.payload.requestId) {
      return response;
    }
  }
}

export const reducer = (state = {}, { type, payload = {} }) => {
  const { responseData, modelType, requestId } = payload;
  switch(type) {
  case API_RECEIVE:
    return {
      ...state,
      [modelType]: {
        ...(state?.[modelType]),
        [requestId]: {
          ...(get(state, [modelType, requestId], {})),
          ...responseData[modelType],
        },
        ...Object.values(
          responseData?.[modelType] || {}
        ).reduce((acc, data) => ({
          ...acc,
          [uniqueRecordId()]: {
            ...data,
          },
        }), {}),
      },
    };
  default:
    return state;
  }
}

export default reducer;
