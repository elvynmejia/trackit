import {
  API_FIND,
  API_FIND_ALL,
  API_CREATE,
  API_UPDATE,
  API_DELETE,
} from '../api';

export const API_SUCCESS = 'requests/success';
export const apiSuccess = ({
  modelType,
  status,
  errors = [],
  requestId,
  message,
  responseIds = [],
}) => ({
  type: API_SUCCESS,
  payload: {
    modelType,
    status,
    errors,
    requestId,
    message,
    responseIds
  },
});

export const API_ERROR = 'requests/error';
export const apiError = ({
  modelType,
  status,
  errors = [],
  requestId,
  message,
  responseIds = []
}) => ({
  type: API_ERROR,
  payload: {
    modelType,
    status,
    errors,
    requestId,
    message,
    responseIds
  },
});

export const reducer = (state = {}, { type, payload = {} }) => {
  const {
    modelType,
    status,
    errors,
    requestId,
    message,
    responseIds,
  } = payload;
  switch(type) {
  case API_FIND:
  case API_FIND_ALL:
  case API_CREATE:
  case API_UPDATE:
  case API_DELETE:
    return {
      ...state,
      [modelType]: {
        [requestId]: {
          pending: true,
        },
      },
    };
  case API_SUCCESS:
  case API_ERROR:
    return {
      ...state,
      [modelType]: {
        ...state[modelType],
        [requestId]: {
          pending: false,
          status,
          errors,
          requestId,
          message,
          responseIds,
        },
      },
    };
  default:
    return state;
  }
}

export default reducer;
