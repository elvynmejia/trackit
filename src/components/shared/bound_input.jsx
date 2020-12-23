import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes as T } from 'prop-types';

import {
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
} from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';

import { modelUpdate } from 'actions/model';

export const BoundInput = ({ modelType, requestId, name: property, type, ...rest}) => {
  const dispatch = useDispatch();

  let propertyValue = useSelector(state => (
    state?.clientSide?.[modelType]?.[requestId]?.[property] || ''
  ));

  // should have a default value
  if (type === 'date' || type === 'time' || type === 'datetime') {
    if (!propertyValue) {
      propertyValue = new Date();
    }
  }

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

  if (type === 'date') {
    return (
      <KeyboardDatePicker
        value={propertyValue}
        onChange={(v) => onChange({ target: { name: property, value: v }})}
        name={property}
        {...rest}
      />
    )
  } else if (type === 'time') {
    return (
      <KeyboardTimePicker
        value={propertyValue}
        onChange={(v) => onChange({ target: { name: property, value: v }})}
        name={property}
        {...rest}
      />
    )
  } else if (type === 'datime') {
    return (
      <DateTimePicker
        value={propertyValue}
        onChange={(v) => onChange({ target: { name: property, value: v }})}
        name={property}
        {...rest}
      />
    )
  }

  return (
    <TextField
      value={propertyValue}
      onChange={onChange}
      name={property}
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
