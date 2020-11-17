// We should be able to differentiate between client vs server data
// models is clearly client side data
import { uuid } from 'uuidv4';
import { get } from 'lodash';

const getRequestId = () => uuid();

export const MODEL_CREATE = 'model/create';
export const modelCreate = (modelType, payload = {}) => ({
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
    // debugger
    console.log(payload);
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