import { uuid } from 'uuidv4';

const getRequestId = () => uuid();

export const MODEL_CREATE = 'model/create';
export const modelCreate = ({ modelType, payload = {} } = {}) => ({
  type: MODEL_CREATE,
  payload: {
    modelType,
    payload,
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

export const reducer = (state = {}, { type, payload = {} }) => {
  const {
    modelType,
    name,
    value,
    requestId
  } = payload;

  switch(type) {
  case MODEL_CREATE:
    return {
      [modelType]: {
        message: `Creating this new model ${modelType}`,
      },
    };
  case MODEL_UPDATE:
    return {
      [modelType]: {
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
