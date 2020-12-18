import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { closeModal } from 'actions/interfaces';
import { MODAL_ID } from './index';
import { TYPE as STAGE_TYPE } from 'models/stage';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SeeMore = ({ stageId, index, modalId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    open
  } = useSelector(state => (
    state.interfaces?.modal?.[modalId] || false
  ));

  const stage = useSelector(state => {
    return Object.values(
      state?.serverSide?.[STAGE_TYPE] || {}
    ).find(s => s.id === stageId) || {};
  });

  const {
    title,
    description,
    links,
    start_at,
    end_at,
    notes,
    state,
  } = stage;

  const close = () => dispatch(closeModal(modalId));

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
          >
            {title}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={close}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <ListItemText
            primary="state"
            secondary={state}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="title"
            secondary={title}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="description"
            secondary={description}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="notes"
            secondary={notes}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="links"
            secondary={links}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Starts"
            secondary={start_at}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="ends at"
            secondary={end_at}
          />
        </ListItem>
      </List>
    </Dialog>
  );
}

// description(pin):"See how you go about solving a technical problem"
// end_at(pin):"2020-11-12T01:23:07"
// id(pin):1
// lead_id(pin):1
// links(pin):""
// notes(pin):""
// start_at(pin):"2020-11-12T01:23:07"
// state(pin):"phone_screen"
// title(pin):"Gloria <> Elvyn | Technical"
export default SeeMore;
