import React from 'react';
import { PropTypes as T } from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ModalDialog from 'components/shared/modal_dialog';
import { closeModal } from 'actions/interfaces';

import { TYPE } from 'models/lead';

// company_name(pin):"Gem"
// contacts(pin):"Not gonna make it startup"
// created_at(pin):"2021-02-04T18:12:20Z"
// current_stage_id(pin):"stage_1eb0a5dee68a43de8f78fd9c4d"
// description(pin):"Not gonna make it startup"
// id(pin):"lead_734c457f24b243dcba583f34e8d"
// reference(pin):"ref: stage_1eb0a5dee68a43de8f78fd9c4d"
// role(pin):"Software Engineer"
// status(pin):"unscheduled"
// updated_at(pin):"2021-02-07T21:11:23Z"

export const LeadDetails = ({ leadId, modalId, onEdit }) => {
  const dispatch = useDispatch();
  const lead = useSelector(state => {
    return state.serverSide?.[TYPE]?.[leadId] ?? {}
  });

  const edit = () => {
    dispatch(closeModal(modalId));
    onEdit();
  };

  const {
    current_stage_id,
    reference,
    description,
    created_at,
    updated_at,
    status,
    role,
    id,
    contacts,
    company_name,
  } = lead;

  const content = (
    <>
      <List>
        <ListItem>
          <ListItemText
            primary="id"
            secondary={id}
            textPrimary
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="status"
            secondary={status}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="role"
            secondary={role}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Company Name"
            secondary={company_name}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="description"
            secondary={description}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="contacts"
            secondary={contacts}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="reference"
            secondary={reference}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Current Stage Id"
            secondary={current_stage_id}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Creted At"
            secondary={created_at}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Last Updated At"
            secondary={updated_at}
          />
        </ListItem>
      </List>
    </>
  );

  return (
    <ModalDialog
      modalId={modalId}
      title={lead.status}
      maxWidth="lg"
      content={content}
      primaryAction={edit}
      primaryActionText="Edit"
    />
  );
}

LeadDetails.propTypes = {
  leadId: T.string.isRequired,
  modalId: T.string.isRequired,
};

export default LeadDetails;
