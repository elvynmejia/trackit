import React, { useMemo, forwardRef } from 'react';
import { PropTypes as T } from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

export const ListItemLink = ({ icon, primary, to }) => {
  const renderLink = useMemo(
    () => forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}


ListItemLink.propTypes = {
  icon: T.element,
  primary: T.string.isRequired,
  to: T.string.isRequired,
};

export default ListItemLink;
