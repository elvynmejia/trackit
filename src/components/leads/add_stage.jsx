import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';

import { modelCreate } from 'actions/model';
import { create } from 'actions/api';


import { TYPE } from 'models/stage';

import { BoundInput } from 'components/shared/bound_input';
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

const getRequestId = (id) => `components/add-stage/${id}`;

export const AddStage = ({ lead_id, open }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const requestId = getRequestId(lead_id);

  useEffect(() => {
    dispatch(modelCreate({
      modelType: TYPE,
      requestId,
      payload: {
        state: 'phone_screen',
        lead_id,
        start_at: new Date().toIsso,
        end_at: new Date()
      },
    }));
  }, []);

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

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
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
          name="start_at_date"
          label="Starts at date"
          className={classes.textField}
          fullWidth
          type="date"
        />
        <BoundInput
          {...boundToStoreInputProps}
          margin="normal"
          name="start_at_time"
          label="Starts at time"
          className={classes.textField}
          fullWidth
          type="time"
        />
        <BoundInput
          {...boundToStoreInputProps}
          name="end_at_date"
          label="Ends at date"
          className={classes.textField}
          fullWidth
          type="date"
        />
        <BoundInput
          {...boundToStoreInputProps}
          margin="normal"
          name="end_at_time"
          label="Ends at time"
          className={classes.textField}
          fullWidth
          type="time"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={submit}
        >
          Save
        </Button>
      </form>
    </Collapse>
  );
}

export default AddStage;
