import React, { useState } from 'react';
import { PropTypes as T } from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

import { closeMenu, openMenu } from 'actions/interfaces';

export const PopoverMenu = ({ menuId, children, ...rest }) => {
  const dispatch = useDispatch();

  // redux crashes if we try to store a syntetic event
  // so we need this little hack
  const [anchorElements, setAnchorEl] = useState({});

  const onClick = ({ currentTarget }) => {
    setAnchorEl({
      ...anchorElements,
      [menuId]: currentTarget,
    });

    dispatch(
      openMenu({ target: menuId, id: menuId})
    )
  }

  const onClose = () => {
    setAnchorEl({
      ...anchorElements,
      [menuId]: null,
    });

    dispatch(closeMenu(menuId));
  }

  const { open } = useSelector(state => (
    state.interfaces?.menu?.[menuId] ?? false
  ));

  const anchorEl = anchorElements[menuId];

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={onClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open || false}
        onClose={onClose}
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
