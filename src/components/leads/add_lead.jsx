import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';

import { closeModal } from 'actions/interfaces';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// company_name required
// position required
// contacts required
// description, optional
// status required
// reference
// current_stage_id

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-end',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export const AddLead = ({ modalId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClose = () => dispatch(closeModal(modalId));
  const onSave = () => console.log('onSave');

  const {
    open
  } = useSelector(state => (
    state.interfaces?.modal?.[modalId] || false
  ));

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <Typography
        variant="h4"
        align="center"
      >
        Fill the form below to createa new lead
      </Typography>

      <p>Add form below</p>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Button
            autoFocus
            color="inherit"
            onClick={onSave}
          >
            Save
          </Button>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}

export default AddLead;
