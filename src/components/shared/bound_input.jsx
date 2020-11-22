import React from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes as T } from 'prop-types';

import TextField from '@material-ui/core/TextField';

import { modelUpdate } from 'actions/model';

export const BoundInput = ({ modelType, requestId, name: property, type, ...rest}) => {
  const dispatch = useDispatch();

  const propertyValue = useSelector(state => get(
    state, ['clientSide', modelType, requestId, property], '')
  );

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

  if (type === 'datetime') {
    return <p>a datetime input</p>
  } else if (type === 'date') {
    return <p>date only</p>
  } else if (type === 'time') {
    return <p>time only</p>
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
