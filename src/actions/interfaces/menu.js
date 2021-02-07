export const OPEN_MENU = 'openMenu';
export const CLOSE_MENU = 'closeMenu';

export const openMenu = ({ id, target }) => ({
  type: OPEN_MENU,
  payload: {
    id,
    target,
  },
});

export const closeMenu = (id) => ({
  type: CLOSE_MENU,
  payload: {
    id,
  },
});

export const reducer = (state = {}, { type, payload = {} }) => {
  const { id, target } = payload;
  switch(type) {
  case CLOSE_MENU:
    return {
      ...state,
      [id]: {
        open: false,
        target: null,
      },
    };
  case OPEN_MENU:
    return {
      ...state,
      [id]: {
        open: true,
        target,
      },
    };
  default:
    return state;
  }
}

export default reducer;
