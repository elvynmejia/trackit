import React from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes as T } from 'prop-types';

import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';

import { modelUpdate } from 'actions/model';

export const BoundInput = ({ modelType, requestId, name: property, type, ...rest}) => {
  const dispatch = useDispatch();

  const propertyValue = useSelector(state => get(
    state, ['clientSide', modelType, requestId, property], '')
  );

  const [setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    dispatch(
      modelUpdate({
        modelType,
        name,
        value,
        requestId,
      })
    );
  }

  const initialDate = new Date();

  if (type === 'datetime') {
    return (
      <>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={initialDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={initialDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </>
    )
  } else if (type === 'date') {
    return (
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date picker inline"
        value={initialDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    )
  } else if (type === 'time') {
    return (
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label="Time picker"
        value={initialDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    )
  }

  return (
    <TextField
      value={propertyValue}
      onChange={onChange}
      name={property}
      requestId={requestId}
      {...rest}
    />
  )
}

BoundInput.propTypes = {
  requestId: T.string,
  name: T.string.isRequired,
  modelType: T.string.isRequired,
  type: T.string.isRequired,
};

export default BoundInput;
