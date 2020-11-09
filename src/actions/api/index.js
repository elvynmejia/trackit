export const API_RECEIVE_SUCCESS = 'api/receive_success';
export const API_RECEIVE_ERROR = 'api/receive_error'

export const API_FIND = 'api/find';
export const find = (modelType, id, query = {}) => ({
  type: API_FIND,
  payload: {
    modelType,
    id,
    query,
  },
});

export const API_FIND_ALL = 'api/find_all'
export const findAll = (modelType, query = {}) => ({
  type: API_FIND_ALL,
  payload: {
    modelType,
    query,
  },
});

export const API_CREATE = 'api/create';
export const apiCreate = (modelType, data) => ({
  type: API_CREATE,
  payload: {
    modelType,
    data,
  },
});

export const API_UPDATE = 'api/update';
export const apiUpdate = (modelType, data) => ({
  type: API_UPDATE,
  payload: {
    modelType,
    data,
  },
});

export const reducer = (state = {}, { type, payload }) => {
  switch(type) {
    case API_RECEIVE_SUCCESS: 
      return {
        message: "API call success",
        status: 200,
      }
    case API_RECEIVE_ERROR:
      return {
        message: 'Error message string',
        errors: [],
        status: 404,
      }
    default: 
        return state;
  }
}

export default reducer;
