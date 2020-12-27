export const OPEN_TOAST_SUCCESS = 'toast/open/success';
export const OPEN_TOAST_ERROR = 'toast/open/error';

export const CLOSE_TOAST = 'closeToast';

export const openToastSuccess = ({
  vertical,
  horizontal,
  id,
  message = 'Success!!',
  severity = 'success',
} ={}) => ({
  type: OPEN_TOAST_SUCCESS,
  payload: {
    id,
    vertical,
    horizontal,
    message,
    severity
  },
});

export const openToastError = ({
  vertical,
  horizontal,
  id,
  message = 'Something went wrong. Try again!!',
  severity = 'error',
} = {}) => ({
  type: OPEN_TOAST_ERROR,
  payload: {
    id,
    vertical,
    horizontal,
    message,
    severity,
  },
});

export const closeToast = (id) => ({
  type: CLOSE_TOAST,
  payload: {
    id,
  },
});

export const reducer = (state = {}, { type, payload = {} }) => {
  switch(type) {
  case CLOSE_TOAST:
    return {
      open: false,
    };
  case OPEN_TOAST_SUCCESS:
  case OPEN_TOAST_ERROR:
    return {
      ...payload,
      open: true,
    };
  default:
    return state;
  }
}

export default reducer;
