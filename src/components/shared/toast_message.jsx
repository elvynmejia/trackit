import React from 'react';
import { PropTypes as T } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
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
    message = 'Success!!',
    severity,
    requestId,
    modelType,
  } = props;

  const {
    open
  } = useSelector(state => (
    state.interfaces?.toast
  ));

  const { errors, message: errorMessage } = useSelector(state => {
    return state.requests?.[modelType]?.[requestId] ?? { errors: [], message: null };
  });

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
        {message || errorMessage}
        {!!errors.length && (
          <ul>
            {errors.map(error => (
              Object.keys(error).map(errorKey => (
                <li key={errorKey}>
                  {errorKey}: {JSON.stringify(error[errorKey])}
                </li>
              ))
            ))}
          </ul>
        )}
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

ToastMessage.propTypes = {
  severity: T.string,
  requestId: T.string,
  modelType: T.string,
}

export default ToastMessage;
