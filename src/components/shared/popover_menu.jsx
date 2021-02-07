import React from 'react';
import { PropTypes as T } from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import Menu from '@material-ui/core/Menu';
import { closeMenu } from 'actions/interfaces';

export const PopoverMenu = ({ menuId, children, ...rest }) => {
  const dispatch = useDispatch();

  const {
    open,
    target,
  } = useSelector(state => (
    state.interfaces?.menu?.[menuId] ?? {}
  ));

  return (
    <Menu
      id={menuId}
      anchorEl={target}
      keepMounted
      open={open}
      onClose={() => dispatch(closeMenu(menuId))}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...rest}
    >
      {children}
    </Menu>
  )
}

PopoverMenu.propTypes = {
  menuId: T.string.isRequired,
  children: T.node.isRequired,
}

export default PopoverMenu;
