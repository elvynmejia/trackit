// We should be able to differentiate between client vs server data
// models is clearly client side data

export const MODEL_CREATE = `model/create`;
export const modelCreate = (modelType, payload = {}) =>  ({
  type: MODEL_CREATE,
  payload: {
    modelType,
    payload,
  },
});

export const MODEL_UPDATE = `model/update`;
export const modelUpdate = (modelType, payload = {}) =>  ({
  type: MODEL_UPDATE,
  payload: {
    modelType,
    payload,
  },
});

export const reducer = (state = {}, { type, payload = {} }) => {
  const { modelType } = payload;
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
        message: `Updating this new model ${modelType}`,
      },
    };
  default:
    return state;
  }
}

export default reducer;