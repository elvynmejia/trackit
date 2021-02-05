import React from 'react';
import { PropTypes as T } from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import {
  closeModal,
} from 'actions/interfaces';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalDialog = ({
  modalId,
  title,
  primaryAction,
  secondaryAction,
  maxWidth,
  actions,
  content,
  ...rest
}) => {

  const dispatch = useDispatch();

  const {
    open
  } = useSelector(state => (
    state.interfaces?.modal?.[modalId] || false
  ));

  const handleClose = () => dispatch(closeModal(modalId)) || secondaryAction;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      fullScreen
    >
      <DialogTitle align="center">
        {title}
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        { actions ? (
          <p>custom actions</p>
        ) : (
          <>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
            <Button onClick={primaryAction} color="primary" autoFocus>
              Ok
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

ModalDialog.propTypes = {
  modalId: T.string.isRequired,
  title: T.string.isRequired,
  onClose: T.func,
  primaryAction: T.func.isRequired,
  secondaryAction: T.func,
  maxWidth: T.string,
  actions: T.arrayOf(T.node),
  content: T.node.isRequired,
}

export default ModalDialog;