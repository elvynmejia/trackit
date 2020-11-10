import { uuid } from 'uuidv4';

const getRequestId = () => uuid();

export const API_RECEIVE = 'api/receive';
export const apiReceive = (modelType, responseData = {}, requestId) => ({
  type: API_RECEIVE,
  payload: {
    modelType,
    responseData,
    requestId,
  },
});

export const API_FIND = 'api/find';
export const find = (modelType, id, query = {}, requestId = getRequestId()) => ({
  type: API_FIND,
  payload: {
    modelType,
    id,
    query,
    requestId
  },
});

export const API_FIND_ALL = 'api/find_all';
export const findAll = (modelType, query = {}, requestId = getRequestId()) => ({
  type: API_FIND_ALL,
  payload: {
    modelType,
    query,
    requestId,
  },
});

export const API_CREATE = 'ap i/create';
export const apiCreate = (modelType, data, requestId = getRequestId()) => ({
  type: API_CREATE,
  payload: {
    modelType,
    data,
    requestId,
  },
});

export const API_UPDATE = 'api/update';
export const apiUpdate = (modelType, data, requestId = getRequestId()) => ({
  type: API_UPDATE,
  payload: {
    modelType,
    data,
    requestId,
  },
});

export const reducer = (state = {}, { type, payload = {} }) => {
  const { responseData, modelType, requestId } = payload;
  switch(type) {
    case API_RECEIVE:
      return {
        ...state,
        [modelType]: {
          [requestId]: {
            ...state[modelType],
            ...responseData[modelType],
          },
        },
      };
    default: 
        return state;
  }
}

export default reducer;
