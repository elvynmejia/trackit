import React, { useEffect }from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BusinessIcon from '@material-ui/icons/Business';


// abtstract this
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// abstract this


import { findAll } from 'actions/api';
import { TYPE as LEAD_TYPE} from 'models/lead';
import { TYPE as STAGE_TYPE} from 'models/stage';
import { STATES } from 'constants/index';

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
}));

const LEADS_REQUEST_ID = 'components/leads-request';

export const Leads = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState({});

  const leads = useSelector(state => get(state.serverSide, [LEAD_TYPE, LEADS_REQUEST_ID],{}));
  const stages = useSelector(state => get(state.serverSide, [STAGE_TYPE],{}));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAll(
      LEAD_TYPE,
      {},
      LEADS_REQUEST_ID
    ))
  }, [dispatch]);

  const fetchStages = (lead_id) => {
    dispatch(findAll(
      STAGE_TYPE,
      { lead_id },
      lead_id
    ));
  }

  const toggleListItem = (id) => {
    setOpen({[id]: !open[id]});
    if (open[id]) {
      fetchStages(id);
    }
  };

  return (
    <>
      {Object.values(leads).map(({id: lead_id, company_name, position, status, description }) => {
        return (
          <Card key={lead_id} className={classes.root}>
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
                {position}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                onClick={() => toggleListItem(lead_id)}
                aria-expanded={open[lead_id]}
                aria-label="show more"
              >
                {open[lead_id] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </CardActions>
            <Collapse in={open[lead_id]} timeout="auto" unmountOnExit>
              <Timeline align="alternate">
                {Object.values(get(stages, [lead_id], {})).map(
                  ({ id: stage_id, state, title, notes }, index) => {
                    return (
                      <TimelineItem key={`lead-${lead_id}-stage-${stage_id}`}>
                        <TimelineOppositeContent>
                          <Typography variant="body2" color="textPrimary">
                            {STATES[state]}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="primary" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" component="h1">
                              {title}
                            </Typography>
                            <Typography>
                              {notes}
                            </Typography>
                          </Paper>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  }
                )}
              </Timeline>
            </Collapse>
          </Card>
        )
      })}
    </>
  );
};

export default Leads;