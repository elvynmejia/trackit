import React from 'react';
import { PropTypes as T } from 'prop-types';

import { useSelector } from 'react-redux';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { TYPE } from 'models/stage';

// description(pin):"See how you go about solving a technical problem"
// end_at(pin):"2020-11-12T01:23:07"
// id(pin):1
// lead_id(pin):1
// links(pin):""
// notes(pin):""
// start_at(pin):"2020-11-12T01:23:07"
// state(pin):"phone_screen"
// title(pin):"Gloria <> Elvyn | Technical"

const Details = ({ stageId }) => {
  const stage = useSelector(state => {
    debugger
    return state.serverSide?.[TYPE]?.[stageId] ?? {}
  });

  const {
    title,
    description,
    links,
    start_at,
    end_at,
    notes,
    state,
    id
  } = stage;

  return (
    <>
      <Typography
        variant="h4"
        align="center"
      >
        id: {id}
      </Typography>
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
            primary="Starts At"
            secondary={start_at}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Ends at"
            secondary={end_at}
          />
        </ListItem>
      </List>
    </>
  );
}

Details.propTypes = {
  stageId: T.string.isRequired,
};

export default Details;
