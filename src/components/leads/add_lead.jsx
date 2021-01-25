import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { all, put, takeEvery } from 'redux-saga/effects'

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';

import { TYPE } from 'models/lead';
import { BoundInput } from 'components/shared/bound_input';
import {
  closeModal,
  openToastSuccess,
  openToastError,
} from 'actions/interfaces';

import { API_ERROR } from 'actions/requests';

import { create, callApiAndWait, find } from 'actions/api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const KEY = 'component/leads/add-new-lead';
export const ADD_NEW_LEAD_REQUEST_ID = `${KEY}/add-new-lead-request-id`;
export const FETCH_NEWLY_CREATED_LEAD_REQUEST_ID = `${KEY}/fetch-newly-created-lead-request-id`;


export const SAVE = `${KEY}/save-new-lead`;
const save = (modalId) => ({
  type: SAVE,
  payload: {
    modalId,
  },
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
  form: {
    margin: theme.spacing(10)
  }
}));

export function* saveSaga({ payload } = {}) {

  const {
    modalId
  } = payload;

  const response = yield callApiAndWait(
    create({
      modelType: TYPE,
      requestId: ADD_NEW_LEAD_REQUEST_ID ,
    })
  );

  if (response.type === API_ERROR) {
    yield put(
      openToastError({
        message: response.payload.message
      })
    );
    return;
  }

  yield put(openToastSuccess());
  // fetch newly created lead
  // Object.keys(response.payload.responseData.leads)[0]
  debugger

  yield callApiAndWait(
    find({
      modelType: TYPE,
      id: Object.keys(response.payload.responseData.leads)[0],
      requestId: FETCH_NEWLY_CREATED_LEAD_REQUEST_ID,
    })
  );

  yield put(closeModal(
    modalId
  ));
};

export function* sagas(action) {
  yield all([
    yield takeEvery(SAVE, saveSaga)
  ]);
};

export const AddLead = ({ modalId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClose = () => dispatch(closeModal(modalId));
  const onSubmit = () => dispatch(save(modalId));

  const {
    open
  } = useSelector(state => (
    state.interfaces?.modal?.[modalId] ?? false
  ));

  const boundToStoreInputProps = {
    modelType: TYPE,
    type: 'text',
    requestId: ADD_NEW_LEAD_REQUEST_ID,
  };

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

      <form
        autoComplete="off"
        m={6}
        className={classes.form}
      >
        <BoundInput
          {...boundToStoreInputProps}
          name="company_name"
          label="Company Name (required)"
          margin="normal"
          className={classes.textField}
          fullWidth
          required
        />
        <BoundInput
          {...boundToStoreInputProps}
          name="position"
          label="Role (Required)"
          className={classes.textField}
          fullWidth
          required
        />
        <BoundInput
          {...boundToStoreInputProps}
          name="contacts"
          label="Lis of contact(s) (required)"
          className={classes.textField}
          fullWidth
          multiline
          rows={4}
          required
        />
        <BoundInput
          {...boundToStoreInputProps}
          name="description"
          label="Description"
          className={classes.textField}
          fullWidth
          multiline
          rows={4}
        />
        <BoundInput
          {...boundToStoreInputProps}
          margin="normal"
          name="status"
          label="Status(required)"
          className={classes.textField}
          fullWidth
          required
        />
        <BoundInput
          {...boundToStoreInputProps}
          margin="normal"
          name="reference"
          label="reference"
          className={classes.textField}
          fullWidth
        />
        <BoundInput
          {...boundToStoreInputProps}
          margin="normal"
          name="current_stage_id"
          label="Current Stage Id"
          className={classes.textField}
          fullWidth
        />
      </form>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Button
            autoFocus
            type="submit"
            onClick={onSubmit}
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
