export const OPEN_MODAL = 'openModal';
export const CLOSE_MODAL = 'closeModal';

export const openModal = (id) => ({
  type: OPEN_MODAL,
  payload: {
    id,
  },
});

export const closeModal = (id) => ({
  type: CLOSE_MODAL,
  payload: {
    id,
  },
});

export const reducer = (state = {}, { type, payload = {} }) => {
  const { id } = payload;
  switch(type) {
  case CLOSE_MODAL:
    return {
      [id]: {
        open: false,
      },
    };
  case OPEN_MODAL:
    return {
      [id]: {
        open: true,
      },
    };
  default:
    return state;
  }
}

export default reducer;
