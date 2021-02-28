import React, { useState, useEffect } from 'react';
import { all, put, takeEvery } from 'redux-saga/effects'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { modelCreate } from 'actions/model';

import {
  closeModal,
  openToastSuccess,
  openToastError,
} from 'actions/interfaces';

import { TYPE } from 'models/stage';
import { BoundInput } from 'components/shared/bound_input';
import { update, callApiAndWait } from 'actions/api';
import { API_ERROR } from 'actions/requests';
import { generateModalId } from 'components/stages/sequence';
import Details from 'components/stages/details';
import { stagesOptions } from 'constants/index';

import ModalDialog from 'components/shared/modal_dialog';


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


export const KEY = 'component/stages/details';

const getRequestId = ({ leadId, stageId }) => (
  `${KEY}/edit-lead-${leadId}-stage-${stageId}`
);

export const SAVE = `${KEY}/save`;

export const save = (props) => ({
  type: SAVE,
  payload: {
    ...props,
  },
});

export function* saveSaga({ payload } = {}) {

  const {
    stageId,
    leadId,
  } = payload;

  const requestId = getRequestId({ stageId, leadId });
  const modalId = generateModalId({ leadId, stageId });

  const response = yield callApiAndWait(
    update({
      id: stageId,
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

const StageDetails = ({ stageId, index, modalId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [editing, toggleEdit] = useState(false);

  useEffect(() => {
    return () => {
      // component willunmount
      if (editing) {
        toggleEdit(false)
      }
    };
  });

  const stage = useSelector(state => {
    return Object.values(
      state?.serverSide?.[TYPE] || {}
    ).find(s => s.id === stageId) || {};
  });

  const requestId = getRequestId({
    stageId,
    leadId: stage.lead_id
  });

  const boundToStoreInputProps = {
    modelType: TYPE,
    type: 'text',
    requestId,
  };

  const close = () => dispatch(closeModal(modalId));

  const edit = () => {
    toggleEdit(!editing);
    dispatch(modelCreate({
      modelType: TYPE,
      payload: {
        ...stage,
      },
      requestId,
    }));
  };

  const onSave = () => dispatch(
    save({
      stageId: stage.id,
      leadId: stage.lead_id,
    })
  );

  let actions;

  if (editing) {
    actions = (
      [
        <Button
          onClick={close}
          variant="contained"
          color="secondary"
        >
          Close
        </Button>,
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      ]
    )
  }

  const content = (
    <>
      {editing ? (
        <form noValidate autoComplete="off">
          <BoundInput
            {...boundToStoreInputProps}
            margin="normal"
            name="state"
            label="State"
            className={classes.textField}
            fullWidth
            type="select"
            options={stagesOptions}
            required
          />
          <BoundInput
            {...boundToStoreInputProps}
            name="title"
            label="Title"
            margin="normal"
            className={classes.textField}
            fullWidth
            required
          />
          <BoundInput
            {...boundToStoreInputProps}
            name="links"
            label="Links"
            className={classes.textField}
            fullWidth
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
            required
          />
          <BoundInput
            {...boundToStoreInputProps}
            name="notes"
            label="Notes"
            className={classes.textField}
            fullWidth
            multiline
            rows={4}
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
        </form>
      ) : (
        <Details stageId={stageId} />
      )}
    </>
  )

  return (
    <ModalDialog
      modalId={modalId}
      title={stage.title}
      maxWidth="lg"
      content={content}
      actions={actions}
      primaryAction={edit}
      primaryActionText="Edit"
    />
  );
}

// description(pin):"See how you go about solving a technical problem"
// end_at(pin):"2020-11-12T01:23:07"
// id(pin):1
// lead_id(pin):1
// links(pin):""
// notes(pin):""
// start_at(pin):"2020-11-12T01:23:07"
// state(pin):"phone_screen"
// title(pin):"Gloria <> Elvyn | Technical"
export default StageDetails;
