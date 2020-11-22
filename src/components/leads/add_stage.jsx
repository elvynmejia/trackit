import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';

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

const requestId = (id) => `components/add-stage/${id}`;

export const AddStage = ({ lead_id, open }) => {
  const boundToStoreInputProps = {
    modelType: TYPE,
    requestId: requestId(lead_id),
    type: 'text',
  };

  const classes = useStyles();
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
        />
        <BoundInput
          {...boundToStoreInputProps}
          name="Start datetime"
          label="Description"
          className={classes.textField}
          fullWidth
          type="datetime"
        />
      </form>
    </Collapse>
  );
}

export default AddStage;
