import React from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes as T } from 'prop-types';

import TextField from '@material-ui/core/TextField';

import { modelUpdate } from 'actions/model';

export const BoundInput = ({ modelType, requestId, name: property, ...rest}) => {
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
  name: T.string.isRequired,
  modelType: T.string.isRequired,
  requestId: T.string,
};

export default BoundInput;
