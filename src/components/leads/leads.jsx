import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import BusinessIcon from '@material-ui/icons/Business';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';

import { findAll } from 'actions/api';
import { openModal, openMenu, closeMenu } from 'actions/interfaces';

import { TYPE as LEAD_TYPE } from 'models/lead';

import AddLead from './add_lead';
import EditLead from './edit';
import LeadDetails from './details';

import { Sequence } from './sequence';
import StageDetails from 'components/stages/details_modal';
import PopoverMenu from 'components/shared/popover_menu';
import { KEY } from './index';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: '10px 3px',
  },
  chip: {
    marginBottom: theme.spacing(1)
  },
  image: {
    width: '100%',
    height: '100%',
  },
  addIcon: {
    marginRight: theme.spacing(1),
  }
}));

export const LEADS_REQUEST_ID = `${KEY}/request`;
export const ADD_NEW_LEAD_MODAL_ID = `${KEY}/add-new-lead-modal-id`;
export const CURRENT_STAGE_MODAL_ID = `${KEY}/current-stage-modal-id`;
export const STAGE_DETAILS_MODAL_ID = `${KEY}/stage-details-modal-id`;
export const EDIT_LEAD_MODAL_ID = `${KEY}/edit-lead-modal-id`;
export const SEE_LEAD_MODAL_ID = `${KEY}/see-lead-modal-id`;


export const MENU = `${KEY}/menu`;
export const menuId = (id) => `${MENU}/${id}`;

export const Leads = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const leads = useSelector(state => {
    return Object.values(state.serverSide?.[LEAD_TYPE] ?? {});
  });

  useEffect(() => {
    dispatch(
      findAll({
        modelType: LEAD_TYPE,
        requestId: LEADS_REQUEST_ID
      })
    )
  }, [dispatch]);

  const editModalId = (id) => `${EDIT_LEAD_MODAL_ID}/${id}`;
  const seeModalId = (id) => `${SEE_LEAD_MODAL_ID}/${id}`;

  const editLead = (id) => {
    dispatch(closeMenu(menuId(id)));
    dispatch(openModal(editModalId(id)));
  };

  const seeLead = (id) => {
    dispatch(closeMenu(menuId(id)));
    dispatch(openModal(seeModalId(id)));
  };

  return (
    <div>
      <Fab
        variant="extended"
        color="primary"
        onClick={() => dispatch(openModal(ADD_NEW_LEAD_MODAL_ID))}
      >
        <AddIcon className={classes.addIcon} />
        Add New Lead
      </Fab>

      <AddLead open={true} modalId={ADD_NEW_LEAD_MODAL_ID} />
      {leads.map(({id: lead_id, company_name, role, status, description, current_stage_id }) => {
        const popOverMenuId = menuId(lead_id);
        return (
          <Card key={lead_id} className={classes.root} variant="outlined">
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12} container>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid item md={3}>
                    <Avatar
                      aria-label="lead"
                      className={classes.image}
                      variant="square"
                    >
                      <BusinessIcon />
                    </Avatar>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      gutterBottom
                      variant="h5"
                    >
                      {role}
                      {lead_id}
                    </Typography>
                    <Chip
                      label={status}
                      color="secondary"
                      variant="outlined"
                      size="small"
                      className={classes.chip}
                    />
                    {current_stage_id ? (
                      <>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="p"
                        >
                          <Link
                            onClick={() => dispatch(openModal(STAGE_DETAILS_MODAL_ID))}
                          >
                            Current Stage: {current_stage_id}
                          </Link>
                          <StageDetails
                            stageId={current_stage_id}
                            modalId={STAGE_DETAILS_MODAL_ID}
                          />
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        variant="body2"
                        gutterBottom
                        component="p"
                      >
                        No current stage set. Please update this lead to assign a current stage
                      </Typography>

                    )}
                    <Typography
                      variant="body1"
                      gutterBottom
                      color="textSecondary"
                      component="p"
                    >
                      {company_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="textSecondary"
                      component="p"
                    >
                      {description}
                    </Typography>
                  </Grid>
                  <Grid item md={3}
                    container
                    direction="row"
                    justify="flex-end"
                  >
                    <MoreVertIcon
                      aria-controls={popOverMenuId}
                      aria-haspopup="true"
                      onClick={(e) => {
                        dispatch(
                          openMenu({ target: e.currentTarget, id: popOverMenuId})
                        )
                      }}
                    />
                    <PopoverMenu
                      menuId={popOverMenuId}
                    >
                      <MenuItem
                        onClick={() => editLead(lead_id)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => seeLead(lead_id)}
                      >
                        See Details
                      </MenuItem>
                      <MenuItem>Logout</MenuItem>
                    </PopoverMenu>

                    <EditLead
                      key={editModalId(lead_id)}
                      modalId={editModalId(lead_id)}
                      leadId={lead_id}
                    />
                    <LeadDetails
                      key={seeModalId(lead_id)}
                      modalId={seeModalId(lead_id)}
                      leadId={lead_id}
                      onEdit={() => dispatch(openModal(editModalId(lead_id)))}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Sequence lead_id={lead_id} />
            </Grid>
          </Card>
        )
      })}
    </div>
  );
};


export default Leads;
