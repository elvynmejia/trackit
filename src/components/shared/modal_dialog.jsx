import React from 'react';
import { PropTypes as T } from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
  primaryActionText,
  secondaryAction,
  secondaryActionText,
  maxWidth,
  actions,
  content,
  ...rest
}) => {

  const dispatch = useDispatch();

  const {
    open
  } = useSelector(state => (
    state.interfaces?.modal?.[modalId] ?? false
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
      fullWidth
    >
      <DialogTitle align="center">
        {title}
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        { actions ? (
          actions.map(action => action)
        ) : (
          <>
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              {secondaryActionText || 'Close'}
            </Button>
            <Button
              onClick={primaryAction}
              variant="contained"
              color="primary"
            >
              {primaryActionText || 'Ok'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

ModalDialog.defaultProps = {
  maxWidth: 'xl',
}

ModalDialog.propTypes = {
  modalId: T.string.isRequired,
  title: T.string.isRequired,
  onClose: T.func,
  primaryAction: T.func.isRequired,
  primaryActionText: T.string.isRequired,
  secondaryAction: T.func,
  secondaryActionText: T.string.isRequired,
  maxWidth: T.string,
  actions: T.arrayOf(T.node),
  content: T.node.isRequired,
}

export default ModalDialog;
