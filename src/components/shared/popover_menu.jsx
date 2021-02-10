import React from 'react';
import { PropTypes as T } from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

import { closeMenu, openMenu } from 'actions/interfaces';

export const PopoverMenu = ({ menuId, children, ...rest }) => {
  const dispatch = useDispatch();

  const {
    open,
    target,
  } = useSelector(state => (
    state.interfaces?.menu?.[menuId] ?? false
  ));

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={(e) => {
          dispatch(
            openMenu({ target: e.currentTarget, id: menuId})
          )
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={menuId}
        anchorEl={target}
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
    </>
  )
}

PopoverMenu.propTypes = {
  menuId: T.string.isRequired,
  children: T.node.isRequired,
}

export default PopoverMenu;
