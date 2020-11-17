import React, { useEffect }from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import { modelUpdate } from 'actions/model';
import { TYPE } from 'models/stage';
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


const REQUEST_ID = 'components/add-stage';

export const AddStage = ({ lead_id, open }) => {
  const dispatch = useDispatch();

  const title = useSelector(state => get(
    state, ['clientSide', TYPE, REQUEST_ID, 'title'], '')
  );

  const onChange = ({ target }) => {
    const { name, value } = target;
    dispatch(
      modelUpdate({
        modelType: TYPE,
        name,
        value,
        requestId: REQUEST_ID,
      })
    );
  }

  const classes = useStyles();
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <form noValidate autoComplete="off">
        <TextField
          name="title"
          label="Title"
          margin="normal"
          className={classes.textField}
          onChange={onChange}
          value={title}
          fullWidth
        />
        <TextField
          name="links"
        	label="links"
        	className={classes.textField}
        	fullWidth
          onChange={onChange}
        />
        <TextField
          name="description"
          label="Description"
          className={classes.textField}
          onChange={onChange}
          fullWidth
        />
      </form>
    </Collapse>
  );
}

export default AddStage;