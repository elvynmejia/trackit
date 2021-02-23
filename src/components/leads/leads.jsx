import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { leadStatusesOptions } from 'constants/index';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import BusinessIcon from '@material-ui/icons/Business';

import MenuItem from '@material-ui/core/MenuItem';

import { findAll } from 'actions/api';
import { openModal } from 'actions/interfaces';

import { TYPE as LEAD_TYPE } from 'models/lead';

import AddLead from './add_lead';
import EditLead from './edit';
import LeadDetails from './details';
import DeleteLead from './delete';


import { Sequence } from 'components/stages/sequence';
import StageDetails from 'components/stages/details_modal';
import AddStage from 'components/stages/add_stage';

import PopoverMenu from 'components/shared/popover_menu';
import { KEY } from './index';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
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
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    height: theme.spacing(16),
    '& > *': {
      padding: theme.spacing(1),
    },
  },
  avatarGridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export const LEADS_REQUEST_ID = `${KEY}/request`;
export const ADD_NEW_LEAD_MODAL_ID = `${KEY}/add-new-lead-modal-id`;
export const CURRENT_STAGE_MODAL_ID = `${KEY}/current-stage-modal-id`;
export const STAGE_DETAILS_MODAL_ID = `${KEY}/stage-details-modal-id`;
export const EDIT_LEAD_MODAL_ID = `${KEY}/edit-lead-modal-id`;
export const SEE_LEAD_MODAL_ID = `${KEY}/see-lead-modal-id`;
export const ADD_NEW_STAGE_MODAL_ID = `${KEY}/add-new-stage-modal-id`;
export const DELETE_LEAD_MODAL_ID = `${KEY}/delete-lead-modal-id`;
export const FILTER_LEADS_BY = `${KEY}/filter-lead-by`;

export const MENU = `${KEY}/menu`;
export const menuId = (id) => `${MENU}/${id}`;
export const defaultStatus = 'unscheduled';
export const Leads = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const leads = useSelector(({ requests, serverSide }) => {
    return (
      requests?.[LEAD_TYPE]?.[LEADS_REQUEST_ID]?.responseIds ?? []
    ).map(id => serverSide?.[LEAD_TYPE]?.[id])
  });

  const loading = useSelector(state => state.requests[LEAD_TYPE]?.[LEADS_REQUEST_ID]?.pending || false)

  const editModalId = (id) => `${EDIT_LEAD_MODAL_ID}/${id}`;
  const seeModalId = (id) => `${SEE_LEAD_MODAL_ID}/${id}`;
  const addNewStageModalId = (id) => `${ADD_NEW_STAGE_MODAL_ID}/${id}`;
  const deleteLeadModalId = (id) => `${DELETE_LEAD_MODAL_ID}/${id}`;

  const editLead = (id) => {
    dispatch(
      openModal(editModalId(id))
    );
  };

  const seeLead = (id) => {
    dispatch(
      openModal(seeModalId(id))
    );
  };

  const addNewStage = (id) => {
    dispatch(
      openModal(addNewStageModalId(id))
    );
  }

  const deleteCurrentLead = (id) => {
    dispatch(
      openModal(deleteLeadModalId(id))
    );
  }

  return (
    <div>
      <Fab
        variant="extended"
        color="primary"
        onClick={() => dispatch(openModal(ADD_NEW_LEAD_MODAL_ID))}
      >
        <AddIcon className={classes.addIcon} />
        Create New Lead
      </Fab>

      <AddLead
        open={true}
        modalId={ADD_NEW_LEAD_MODAL_ID}
      />

      <FilterBox
        defaultStatus={defaultStatus}
      />

      {!leads.length && !loading && (
        <Typography>No results</Typography>
      )}

      {loading && <CircularProgress />}

      {leads.map(({id: lead_id, company_name, role, status, description, current_stage_id, disabled_at }) => {
        const popOverMenuId = menuId(lead_id);
        return (
          <Card key={lead_id} className={classes.root} variant="outlined">
            <Grid container spacing={2}>
              <Grid item xs={12} container>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    md={2}
                    className={classes.avatarGridItem}
                  >
                    <Avatar
                      aria-label="lead"
                      className={classes.image}
                      variant="square"
                    >
                      <BusinessIcon />
                    </Avatar>
                  </Grid>
                  <Grid item md={7}>
                    <Typography
                      gutterBottom
                      variant="h5"
                    >
                      {role}
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
                          Current Stage {' '}
                          <Link
                            onClick={() => dispatch(openModal(STAGE_DETAILS_MODAL_ID))}
                          >
                            {current_stage_id}
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
                  <Grid
                    item
                    md={3}
                    container
                    direction="row"
                    justify="flex-end"
                    alignContent="flex-start"
                    alignItems="center"
                  >

                    {disabled_at && <Chip label="Disabled" />}
                    <PopoverMenu
                      menuId={popOverMenuId}
                    >
                      <MenuItem
                        onClick={() => editLead(lead_id)}
                      >
                        Edit Lead
                      </MenuItem>
                      <MenuItem
                        onClick={() => seeLead(lead_id)}
                      >
                        See Lead Details
                      </MenuItem>
                      <MenuItem
                        onClick={() => addNewStage(lead_id)}
                      >
                        Add a Stage
                      </MenuItem>
                      <MenuItem
                        onClick={() => deleteCurrentLead(lead_id)}
                      >
                        Delete Lead
                      </MenuItem>
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
                    <AddStage
                      modalId={addNewStageModalId(lead_id)}
                      leadId={lead_id}
                    />
                    <DeleteLead
                      modalId={deleteLeadModalId(lead_id)}
                      leadId={lead_id}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Sequence lead_id={lead_id} key={lead_id}/>
            </Grid>
          </Card>
        )
      })}
    </div>
  );
};

const useStylesFilterBox = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    height: theme.spacing(16),
    padding: theme.spacing(3),
  },
}));

const FilterBox = (props) => {
  const classes = useStylesFilterBox();
  const dispatch = useDispatch();

  const handleClange = ({ target }) => {
    fetchLeads({ status: target.value });
  }

  const fetchLeads = useCallback((query) => {
    dispatch(
      findAll({
        modelType: LEAD_TYPE,
        requestId: LEADS_REQUEST_ID,
        query,
      })
    )
  },[dispatch]);

  useEffect(() => {
    fetchLeads({ status: defaultStatus });
  },[fetchLeads]);

  return (
    <Paper elevation={1} className={classes.paper}>
      <Typography variant="h6" align="center">
        Filter your leads by status
      </Typography>

      <TextField
        select
        onChange={handleClange}
        defaultValue="unscheduled"
        name="status"
        size="medium"
        fullWidth
      >
        {leadStatusesOptions.map(({ value, label }) => (
          <MenuItem
            key={value}
            value={value}
          >
            {label}
          </MenuItem>
        ))}
      </TextField>
    </Paper>
  )
}

export default Leads;
