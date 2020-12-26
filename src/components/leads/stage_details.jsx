import React, { useState, useEffect } from 'react';
import { call, all, put, takeEvery, select } from 'redux-saga/effects'

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { uuid } from 'uuidv4';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { modelCreate } from 'actions/model';
import { closeModal } from 'actions/interfaces';
import { TYPE } from 'models/stage';
import { BoundInput } from 'components/shared/bound_input';
import { update, callApiAndWait } from 'actions/api';
import { API_ERROR } from 'actions/requests';


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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const KEY = 'component/leads/stage-details';
const getRequestId = ({ leadId, stageId }) => `${KEY}/edit-lead-${leadId}-stage-${stageId}`;

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
    requestId,
  } = payload;

  const response = yield callApiAndWait(
    update({
      id: stageId,
      modelType: TYPE,
      requestId,
    })
  );

  if (response.type === API_ERROR) {
    console.log(`error => ${JSON.stringify(response)}`);
  }

  console.log('success');
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

  const stage = useSelector(state => {
    return Object.values(
      state?.serverSide?.[TYPE] || {}
    ).find(s => s.id === stageId) || {};
  });

  const requestId = getRequestId({
    stageId, leadId:
    stage.lead_id
  });

  const {
    open
  } = useSelector(state => (
    state.interfaces?.modal?.[modalId] || false
  ));

  const boundToStoreInputProps = {
    modelType: TYPE,
    type: 'text',
    requestId,
  };

  const {
    title,
    description,
    links,
    start_at,
    end_at,
    notes,
    state,
  } = stage;

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

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <Typography
        variant="h4"
        align="center"
      >
        {title}
      </Typography>
      {editing ? (
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
        </form>
      ) : (
        <List>
          <ListItem>
            <ListItemText
              primary="state"
              secondary={state}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="title"
              secondary={title}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="description"
              secondary={description}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="notes"
              secondary={notes}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="links"
              secondary={links}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Starts At"
              secondary={start_at}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Ends at"
              secondary={end_at}
            />
          </ListItem>
        </List>
      )}
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          {editing ? (
            <Button
              autoFocus
              color="inherit"
              onClick={onSave}
            >
              Save
            </Button>
          ) : (
            <Button
              autoFocus
              color="inherit"
              onClick={edit}
            >
              Edit
            </Button>
          )}
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Dialog>
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
