import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { all, put, takeEvery } from 'redux-saga/effects'

import { TYPE } from 'models/lead';
import { BoundInput } from 'components/shared/bound_input';

import ModalDialog from 'components/shared/modal_dialog';
import { leadStatusesOptions } from 'constants/index';


import {
  closeModal,
  openToastSuccess,
  openToastError,
} from 'actions/interfaces';

import { API_ERROR } from 'actions/requests';

import { create, callApiAndWait } from 'actions/api';

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
// role required
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
        message: response.payload.message,
        modelType: TYPE,
        requestId: ADD_NEW_LEAD_REQUEST_ID,
      })
    );
    return;
  }

  yield put(openToastSuccess());

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

  const onSubmit = () => dispatch(save(modalId));

  const boundToStoreInputProps = {
    modelType: TYPE,
    type: 'text',
    requestId: ADD_NEW_LEAD_REQUEST_ID,
  };

  const content = (
    <form
      autoComplete="off"
      m={6}
      className={classes.form}
    >
      <BoundInput
        {...boundToStoreInputProps}
        type="select"
        margin="normal"
        name="status"
        label="Status"
        className={classes.textField}
        fullWidth
        required
        options={leadStatusesOptions}
      />
      <BoundInput
        {...boundToStoreInputProps}
        name="company_name"
        label="Company Name"
        margin="normal"
        className={classes.textField}
        fullWidth
        required
      />
      <BoundInput
        {...boundToStoreInputProps}
        name="role"
        label="Role"
        className={classes.textField}
        fullWidth
        required
      />
      <BoundInput
        {...boundToStoreInputProps}
        name="contacts"
        label="Lis of contact(s)"
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

  )

  return (
    <ModalDialog
      modalId={modalId}
      title="Fill the form below to createa new lead"
      maxWidth="lg"
      content={content}
      primaryAction={onSubmit}
      primaryActionText="Create"
    />
  );
}

export default AddLead;
