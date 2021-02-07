import { combineReducers } from 'redux';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  openModal,
  closeModal,
  reducer as modal,
} from './modal';

import {
  OPEN_TOAST_SUCCESS,
  OPEN_TOAST_ERROR,
  CLOSE_TOAST,
  openToastSuccess,
  openToastError,
  closeToast,
  reducer as toast,
} from './toast';

import {
  OPEN_MENU,
  CLOSE_MENU,
  openMenu,
  closeMenu,
  reducer as menu,
} from './menu';


const reducer = combineReducers({
  modal,
  toast,
  menu,
});

export {
  OPEN_MODAL,
  CLOSE_MODAL,
  openModal,
  closeModal,
  OPEN_TOAST_SUCCESS,
  OPEN_TOAST_ERROR,
  CLOSE_TOAST,
  openToastSuccess,
  openToastError,
  closeToast,
  OPEN_MENU,
  CLOSE_MENU,
  openMenu,
  closeMenu,
  reducer,
};
