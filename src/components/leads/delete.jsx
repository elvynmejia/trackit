import React from 'react';
import { useDispatch } from 'react-redux';
import { all, put, takeEvery } from 'redux-saga/effects'

import { TYPE } from 'models/lead';

import ModalDialog from 'components/shared/modal_dialog';
import DialogContentText from '@material-ui/core/DialogContentText';

import {
  closeModal,
  openToastSuccess,
  openToastError,
} from 'actions/interfaces';

import { API_ERROR } from 'actions/requests';

import {
  destroy,
  callApiAndWait,
} from 'actions/api';

export const KEY = 'component/leads/delete-lead';
export const DELETE_LEAD_REQUEST_ID = `${KEY}/request-id`;


export const DELETE = `${KEY}/delete-lead`;
const deleteLead = (props) => ({
  type: DELETE,
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

export function* destroySaga({ payload } = {}) {

  const {
    modalId,
    leadId,
    requestId,
  } = payload;

  const response = yield callApiAndWait(
    destroy({
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
    yield takeEvery(DELETE, destroySaga)
  ]);
};

export const DeleteLead = ({ modalId, leadId }) => {
  const dispatch = useDispatch();
  const requestId = `${DELETE_LEAD_REQUEST_ID}-${leadId}`;

  const onSubmit = () => dispatch(deleteLead({
    modalId,
    leadId,
    requestId,
  }));

  const content = (
    <form
      autoComplete="off"
    >
      <DialogContentText>
        Are you sure you want to delete this lead?
        All stages for this lead will be disable as well.
      </DialogContentText>
    </form>
  )

  return (
    <ModalDialog
      modalId={modalId}
      title={`Delete lead ${leadId}`}
      maxWidth="lg"
      content={content}
      primaryAction={onSubmit}
      primaryActionText="Delete"
    />
  );
}

export default DeleteLead;
