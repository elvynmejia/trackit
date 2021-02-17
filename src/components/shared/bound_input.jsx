import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes as T } from 'prop-types';
import moment from 'moment';

import {
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
} from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


import { modelUpdate } from 'actions/model';

export const BoundInput = ({
  modelType,
  requestId, name:
  property,
  type,
  options = [],
  ...rest
}) => {
  const dispatch = useDispatch();

  let propertyValue = useSelector(state => (
    state?.clientSide?.[modelType]?.[requestId]?.[property] || ''
  ));

  const helperText = rest.helperText || (rest.required ? 'required' : '');

  const otherAttributes = {
    ...rest,
    helperText,
  };

  // should have a default value
  if (type === 'date' || type === 'time' || type === 'datetime') {
    if (!propertyValue) {
      propertyValue = (new Date());
    }
    propertyValue = moment.utc(propertyValue).format();
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
        {...otherAttributes}
      />
    )
  } else if (type === 'time') {
    return (
      <KeyboardTimePicker
        value={propertyValue}
        onChange={(v) => onChange({ target: { name: property, value: v }})}
        name={property}
        {...otherAttributes}
      />
    )
  } else if (type === 'datime') {
    return (
      <DateTimePicker
        value={propertyValue}
        onChange={(v) => onChange({ target: { name: property, value: v }})}
        name={property}
        {...otherAttributes}
      />
    )
  } else if (type === 'select') {
    return (
      <TextField
        select
        value={propertyValue}
        onChange={onChange}
        name={property}
        {...otherAttributes}
      >
        {options.map(({ value, label}) => (
          <MenuItem
            key={value}
            value={value}
          >
            {label}
          </MenuItem>
        ))}
      </TextField>
    )
  }

  return (
    <TextField
      value={propertyValue}
      onChange={onChange}
      name={property}
      helperText={helperText}
      {...otherAttributes}
    />
  )
}

BoundInput.propTypes = {
  requestId: T.string,
  name: T.string.isRequired,
  modelType: T.string.isRequired,
  type: T.string.isRequired,
  options: T.arrayOf(T.shape({
    label: T.string.isRequired,
    value: T.string.isRequired,
  })),
};


export default BoundInput;
