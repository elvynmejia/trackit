import React from 'react';
import { PropTypes as T } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { closeToast } from 'actions/interfaces';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
      key={vertical + horizontal}
    >
      <Alert onClose={close} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

ToastMessage.defaultProps = {
  vertical: 'top',
  horizontal: 'center',
  open: false,
  severity: 'success',
};

export default ToastMessage;
