import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { all, put, takeEvery } from 'redux-saga/effects'

import { modelCreate } from 'actions/model';
import { TYPE } from 'models/lead';
import { BoundInput } from 'components/shared/bound_input';

import ModalDialog from 'components/shared/modal_dialog';

import {
  closeModal,
  openToastSuccess,
  openToastError,
} from 'actions/interfaces';

import { API_ERROR } from 'actions/requests';

import {
  update,
  callApiAndWait,
} from 'actions/api';

export const KEY = 'component/leads/edit-lead';
export const EDIT_LEAD_REQUEST_ID = `${KEY}/request-id`;
export const FETCH_NEWLY_EDITED_LEAD_REQUEST_ID = `${KEY}/fetch-newly-edited-lead-request-id`;


export const SAVE = `${KEY}/save-lead`;
const save = (props) => ({
  type: SAVE,
  payload: {
    ...props,
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
    modalId,
    leadId,
    requestId,
  } = payload;

  const response = yield callApiAndWait(
    update({
      id: leadId,
      modelType: TYPE,
      requestId,
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

  yield put(closeModal(
    modalId
  ));
};

export function* sagas(action) {
  yield all([
    yield takeEvery(SAVE, saveSaga)
  ]);
};

export const EditLead = ({ modalId, leadId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = () => dispatch(save({ modalId, leadId, requestId }));

  const lead = useSelector(state => state.serverSide?.[TYPE]?.[leadId] ?? {});

  const requestId = `${EDIT_LEAD_REQUEST_ID}/${leadId}`;

  // FIX THIS INFINITE LOOP BUG
  useEffect(() => {
    dispatch(
      modelCreate({
        modelType: TYPE,
        payload: {
          ...lead,
        },
        requestId,
      })
    );
  }, [dispatch, lead, requestId]);

  const boundToStoreInputProps = {
    modelType: TYPE,
    type: 'text',
    requestId,
  };

  const content = (
    <form
      autoComplete="off"
      m={6}
      className={classes.form}
    >
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
        name="status"
        label="Status"
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
  )

  return (
    <ModalDialog
      modalId={modalId}
      title={`Editing lead ${leadId}`}
      maxWidth="lg"
      content={content}
      primaryAction={onSubmit}
      primaryActionText="Save"
    />
  );
}

export default EditLead;
