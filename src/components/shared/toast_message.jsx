import React from 'react';
import { PropTypes as T } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

import { closeToast } from 'actions/interfaces';

export const ToastMessage = (props) => {
  const dispatch = useDispatch();

  const {
    vertical,
    horizontal,
    id,
    message = 'Success!!',
    severity,
  } = props;

  const {
    open
  } = useSelector(state => (
    state.interfaces?.toast
  ));

  const close = () => {
    dispatch(closeToast());
  };

  return (
    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={close}
      message={message}
      key={vertical + horizontal}
    />
  );
}

ToastMessage.defaultProps = {
  vertical: 'top',
  horizontal: 'center',
  open: false,
  severity: 'success',
};

export default ToastMessage;
