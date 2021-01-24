import React, { useEffect }from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BusinessIcon from '@material-ui/icons/Business';

import { findAll } from 'actions/api';
import { openModal } from 'actions/interfaces';

import { TYPE as LEAD_TYPE } from 'models/lead';

import AddStageForm from './add_stage';
import AddLead from './add_lead';
import { Sequence } from './sequence';

import { KEY, MODAL_ID } from './index';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';

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
export const Leads = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const leads = useSelector(state => {
    return Object.values(
      get(state.serverSide, [LEAD_TYPE, LEADS_REQUEST_ID], {})
    )
  });

  const openLeads = leads.reduce((acc, current) => {
    return {
      ...acc,
      [current.id]: false,
    }
  }, {});

  const [collapseSeeMore, collapseSeeMoreToggle] = React.useState(openLeads);
  const [collapseAddStage, addStageToggle] = React.useState(openLeads);

  useEffect(() => {
    dispatch(
      findAll({
        modelType: LEAD_TYPE,
        requestId: LEADS_REQUEST_ID
      })
    )
  }, [dispatch]);

  const seeMore = (lead_id) => {
    dispatch(
      openModal(MODAL_ID)
    );
  };

  const addStage = (lead_id) => {
    addStageToggle({
      [lead_id]: !collapseAddStage[lead_id]
    });
    // close see more
    collapseSeeMoreToggle({
      [lead_id]: false,
    });
  }

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
      {leads.map(({id: lead_id, company_name, position, status, description }) => {
        const props = {
          lead_id,
          company_name,
          position,
          status,
          description,
        };

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
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="h5"
                    >
                      {position}
                    </Typography>
                    <Chip
                      label={status}
                      color="secondary"
                      variant="outlined"
                      size="small"
                      className={classes.chip}
                    />
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
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Sequence lead_id={lead_id} />
            </Grid>
            {/*}<ComplexGrid
              {...props }
            >
              <CardContent>
                <Journey lead_id={lead_id} />
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => addStage(lead_id)}
                  aria-expanded={collapseAddStage[lead_id]}
                  aria-label="add stage"
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => seeMore(lead_id)}
                  aria-expanded={collapseSeeMore[lead_id]}
                  aria-label="show more"
                >
                  {collapseSeeMore[lead_id] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </CardActions>
              <AddStageForm open={collapseAddStage[lead_id]} lead_id={lead_id} />
            </ComplexGrid> */}
          </Card>
        )
      })}
    </div>
  );
};

export default Leads;
