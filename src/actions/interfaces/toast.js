export const OPEN_TOAST = 'openToast';
export const CLOSE_TOAST = 'closeToast';

export const openToast = ({ vertical, horizontal, id, message = 'Success!!' }) => ({
  type: OPEN_TOAST,
  payload: {
    id,
    vertical,
    horizontal,
    message,
  },
});

export const closeToast = (id) => ({
  type: CLOSE_TOAST,
  payload: {
    id,
  },
});

export const reducer = (state = {}, { type, payload = {} }) => {
  const { id } = payload;
  switch(type) {
  case CLOSE_TOAST:
    return {
      open: false,
    };
  case OPEN_TOAST:
    return {
      ...payload,
      open: true,
    };
  default:
    return state;
  }
}

export default reducer;
