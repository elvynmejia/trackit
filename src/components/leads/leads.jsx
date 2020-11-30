import React, { useEffect }from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';


import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BusinessIcon from '@material-ui/icons/Business';

import { findAll } from 'actions/api';
import { TYPE as LEAD_TYPE} from 'models/lead';

import SeeMore from './see_more'
import AddStageForm from './add_stage'
import StageDiagram from './stage_diagram';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    margin: '10px 3px',
  },
  nested: {
    // paddingLeft: theme.spacing(4),
  },
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  box: {
    height: theme.spacing(20),
  },
}));

const LEADS_REQUEST_ID = 'components/leads-request';

export const Leads = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const leads = useSelector(state => {
    return Object.values(
      get(state.serverSide, [LEAD_TYPE, LEADS_REQUEST_ID], {})
    )
  });
  const fetchStages = () => {}
  // const stages = useSelector(state => {
  //   return get(state.serverSide, [STAGE_TYPE], {});
  // });

  // const getStages = (lead_id) => {
  //   return Object.values(
  //     get(stages, [lead_id], {})
  //   )
  // }

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
    if (!collapseSeeMore[lead_id]) {
      collapseSeeMoreToggle({
        [lead_id]: true,
      });

      // close add stage
      addStageToggle({
        [lead_id]: false,
      });

      fetchStages(lead_id);
    } else {
      collapseSeeMoreToggle({
        [lead_id]: false,
      });
    }
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
    <>
      {leads.map(({id: lead_id, company_name, position, status, description }) => {
        return (
          <Card key={lead_id} className={classes.root} variant="outlined">
            <CardHeader
              avatar={
                <Avatar
                  aria-label="lead"
                  className={classes.avatar}
                  variant="square"
                >
                  <BusinessIcon />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={company_name}
              subheader={description}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {position || 'no position specified'}
              </Typography>
              <Box className={classes.box}>
                <StageDiagram
                  key={lead_id}
                  lead_id={lead_id}
                />
              </Box>
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
            <SeeMore open={collapseSeeMore[lead_id]} lead_id={lead_id} />
            <AddStageForm open={collapseAddStage[lead_id]} lead_id={lead_id} />
          </Card>
        )
      })}
    </>
  );
};

export default Leads;
