import React, { useEffect }from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

import { findAll } from 'actions/api';
import { TYPE as STAGE_TYPE} from 'models/stage';
import { openModal } from 'actions/interfaces';

import SeeMore from './see_more'

import { MODAL_ID } from './index';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

export const Journey = ({ lead_id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      findAll({
        modelType: STAGE_TYPE,
        query: { lead_id },
        requestId: lead_id,
      })
    );
  }, []);

  const stages = useSelector(state => {
    return Object.values(
      (
        state?.serverSide?.[STAGE_TYPE] || {}
      )?.[lead_id.toString()] ||
      {}
    )
  });

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        connector={<CustomStepConnector />}
      >
        {stages.map(({ id, title }) => {
          return (
            <Step key={id}>
              <StepLabel
                StepIconComponent={(props) => (
                  <StepIcon {...props} />
                )}
              >
                {title}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}

const CustomStepConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '1': {
    background: purple[500],
  },
  '2': {
    background: red[500],
  },
  '3': {
    background: indigo[500],
  },
  '4': {
    background: blue[500],
  },
  '5': {
    background: pink[500],
  },
  '6': {
    background: cyan[500],
  },
  '7': {
    background: green[500],
  },
});

const StepIcon = ({ icon: step}) => {
  const classes = useStepIconStyles();
  return (
    <div
      className={
        clsx(classes.root, { [classes[step]]: true, active: true })
      }
      onClick={() => console.log(`step ${step}`)}
    >
      {step}
    </div>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

export default Journey;
