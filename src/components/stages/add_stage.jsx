import React, { useEffect } from 'react';
import { PropTypes as T } from 'prop-types';
import { all, put, takeEvery } from 'redux-saga/effects'

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import { modelCreate } from 'actions/model';
import { create, callApiAndWait } from 'actions/api';

import {
  closeModal,
  openToastSuccess,
  openToastError,
} from 'actions/interfaces';

import { API_ERROR } from 'actions/requests';

import { TYPE } from 'models/stage';

import { BoundInput } from 'components/shared/bound_input';
import ModalDialog from 'components/shared/modal_dialog';

import { stateOptions } from 'constants/index';

// title str,
// links str
// description str
// notes str
// lead_id int
// state str
// start_at datetime
// end_at datitime

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export const KEY = 'components/stages/add-new-stage';
export const SAVE = `${KEY}/create-stage`;
export const save = (props) => ({
  key: SAVE,
  payload: {
    ...props,
  },
});

export function* saveSaga({ payload } = {}) {

  const {
    modalId,
    requestId,
  } = payload;

  const response = yield callApiAndWait(
    create({
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

const getRequestId = (id) => `components/add-stage/${id}`;

export const AddStage = ({ leadId, modalId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const requestId = getRequestId(leadId);

  useEffect(() => {
    dispatch(modelCreate({
      modelType: TYPE,
      requestId,
      payload: {
        state: 'phone_screen',
        lead_id: leadId,
        start_at: (new Date()).toISOString(),
        end_at: (new Date()).toISOString(),
      },
    }));
  }, [dispatch, requestId, leadId]);

  const boundToStoreInputProps = {
    modelType: TYPE,
    requestId,
    type: 'text',
  };

  const submit = () => {
    dispatch(create({
      modelType: TYPE,
      requestId,
    }));
  }

  const content = (
    <form noValidate autoComplete="off">
      <BoundInput
        {...boundToStoreInputProps}
        name="title"
        label="Title"
        margin="normal"
        className={classes.textField}
        fullWidth
      />
      <BoundInput
        {...boundToStoreInputProps}
        name="links"
        label="links"
        className={classes.textField}
        fullWidth
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
        name="notes"
        label="Notes"
        className={classes.textField}
        fullWidth
        multiline
        rows={4}
      />
      <BoundInput
        {...boundToStoreInputProps}
        margin="normal"
        name="start_at"
        label="Starts At"
        className={classes.textField}
        fullWidth
        type="datime"
      />
      <BoundInput
        {...boundToStoreInputProps}
        margin="normal"
        name="end_at"
        label="Ends At"
        className={classes.textField}
        fullWidth
        type="datime"
      />
      <BoundInput
        {...boundToStoreInputProps}
        margin="normal"
        name="status"
        label="Status"
        className={classes.textField}
        fullWidth
        type="select"
        options={stateOptions}
      />
    </form>
  );

  return (
    <ModalDialog
      modalId={modalId}
      title={'Add New Stage'}
      maxWidth="lg"
      content={content}
      primaryAction={submit}
      primaryActionText="Save"
    />
  );
}

AddStage.propTypes = {
  modalId: T.string.isRequired,
  leadId: T.string.isRequired,
}

export default AddStage;
