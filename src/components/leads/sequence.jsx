import React, { useEffect }from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import DoneIcon from '@material-ui/icons/Done';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

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

import StageDetails from './stage_details'

import { MODAL_ID } from './index';

const KEY = 'component/leads/sequence';

export const generateModalId = ({ stageId, leadId }) => (
  `${KEY}-lead-${leadId}-stage-${stageId}`
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

export const Sequence = ({ lead_id }) => {
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
          const modalId = generateModalId({
            stageId: id,
            leadId: lead_id,
          });

          return (
            <Step key={id}>
              <StepLabel
                StepIconComponent={(props) => (
                  <StepIcon
                    {...props}
                    leadId={lead_id}
                    stageId={id}
                  />
                )}
              >
                {title}
                <StageDetails
                  stageId={id}
                  modalId={modalId}
                />
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
    background: green[500],
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

const StepIcon = ({ icon: step, ...rest }) => {
  const stage = useSelector(state => (
    state.serverSide[STAGE_TYPE]?.[rest.stageId]?.[rest.stageId] || {}
  ));

  const classes = useStepIconStyles();
  const dispatch = useDispatch();
  const modalId = generateModalId({
    ...rest,
  });

  const today = new Date();
  const endAt = new Date(stage.end_at);
  const icon = endAt < today ? <DoneIcon /> : <NotListedLocationIcon />;

  return (
    <div
      className={
        clsx(classes.root, { [classes[step]]: true })
      }
      onClick={() => {
        dispatch(openModal(modalId));
      }}
    >
      {icon}
    </div>
  );
}

StepIcon.propTypes = {
  icon: PropTypes.node,
};

export default Sequence;
