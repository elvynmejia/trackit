import { uuid } from 'uuidv4';

const getRequestId = () => uuid();

export const MODEL_CREATE = 'model/create';
export const modelCreate = ({ modelType, payload = {}, requestId = getRequestId() } = {}) => ({
  type: MODEL_CREATE,
  payload: {
    modelType,
    payload,
    requestId
  },
});

export const MODEL_UPDATE = 'model/update';
export const modelUpdate = ({ modelType, name, value, requestId = getRequestId() } = {}) => ({
  type: MODEL_UPDATE,
  payload: {
    modelType,
    name,
    value,
    requestId,
  },
});

export const MODEL_DELETE = 'model/delete';
export const modelDelete = ({ modelType, requestId = getRequestId() } = {}) => ({
  type: MODEL_DELETE,
  payload: {
    modelType,
    requestId,
  },
});

export const reducer = (state = {}, { type, payload = {} }) => {
  const {
    modelType,
    name,
    value,
    requestId
  } = payload;

  switch(type) {
  case MODEL_DELETE:
    const existingModelsByModelType = state[modelType] || {};
    const newData = Object.keys(
      existingModelsByModelType
    ).reduce((accumulator, currentKey) => {
      if (requestId !== currentKey) {
        return {
          ...accumulator,
          [currentKey]: existingModelsByModelType[currentKey],
        }
      }

      return accumulator;
    }, {});

    return {
      ...state,
      [modelType]: {
        ...newData,
      },
    };
  case MODEL_CREATE:
    return {
      ...state,
      [modelType]: {
        ...state[modelType],
        [requestId]: {
          ...payload.payload
        },
      },
    };
  case MODEL_UPDATE:
    return {
      ...state,
      [modelType]: {
        ...state[modelType],
        [requestId]: {
          ...state[modelType]?.[requestId],
          [name]: value,
        },
      },
    };
  default:
    return state;
  }
}

export default reducer;
