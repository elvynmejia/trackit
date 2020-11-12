import React, { useEffect }from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';


// abtstract this
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import Telegram from '@material-ui/icons/Telegram';

import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
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
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

// import { addCount } from "./store/counter/actions";

const LEADS_REQUEST_ID = 'components/leads-request';
const requestId = (id) => `${LEADS_REQUEST_ID}-${id}-stages`;
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

  const handleClick = (id) => {
    setOpen({...open, [id]: !open[id]});
    fetchStages(id)
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        >
        	Job Leads
        </ListSubheader>
      }
      className={classes.root}
    >
      {Object.values(leads).map(({id: lead_id, company_name, position, status }) => {
        return (
          <div key={lead_id}>
          <ListItem button onClick={() => handleClick(lead_id)}>
            <ListItemText primary={`${company_name} <> ${position || status}`} />
              {open[lead_id] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[lead_id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <Timeline align="alternate">
                    {Object.values(get(stages, [lead_id], {})).map(({ id: stage_id, state, title, notes}, index) => {
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
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a
                                type specimen book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                                It was popularised in the 1960s with the release of Letraset
                                sheets containing Lorem Ipsum passages, and more recently
                                with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                              </Typography>
                            </Paper>
                          </TimelineContent>
                        </TimelineItem>
                      )
                    })}
                  </Timeline>
                </ListItem>
              </List>
            </Collapse>
          </div>
        )
    })}
    </List>
  );
};

export default Leads;