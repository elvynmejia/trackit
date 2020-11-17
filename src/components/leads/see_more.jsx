import React, { useEffect }from 'react';
import { get } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { TYPE as STAGE_TYPE} from 'models/stage';
import { STATES } from 'constants/index';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
}));

export const SeeMore = ({ lead_id, open }) => {
  const classes = useStyles();

  const stages = useSelector(state => {
    return get(state.serverSide, [STAGE_TYPE], {});
  });

  const getStages = (lead_id) => {
    return Object.values(
      get(stages, [lead_id], {})
    )
  }

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Timeline align="alternate">
        {getStages(lead_id).map(
          ({ id: stage_id, state, title, notes }, index) => {
            return (
              <TimelineItem key={`lead-${lead_id}-stage-${stage_id}`}>
                <TimelineOppositeContent>
                  <Chip label={STATES[state]} color="secondary" />
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
                    <Typography>{notes}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            );
          }
        )}
      </Timeline>
    </Collapse>
  );
}

export default SeeMore;