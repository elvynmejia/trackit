import React, { useEffect }from 'react';
import { PropTypes as T } from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { findAll } from 'actions/api';
import { TYPE as STAGE_TYPE} from 'models/stage';

import { openModal } from 'actions/interfaces';

import StageDetails from 'components/stages/details_modal';

const KEY = 'component/leads/sequence';

export const generateModalId = ({ stageId }) => (
  `${KEY}-step-${stageId}`
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
  }, [dispatch,lead_id]);

  const stages = useSelector(state => {
    const stages = state.serverSide?.[STAGE_TYPE] ?? {};
    return Object.values(stages).filter(stage => stage.lead_id === lead_id);
  });

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
      >
        {stages.map(({ id, title, state }, index) => {
          const modalId = generateModalId({
            stageId: id,
          });

          return (
            <Step
              key={id}
              completed={state === 'completed'}
            >
              <StepLabel
                onClick={() => dispatch(openModal(modalId))}
              >
                {title}
              </StepLabel>
              <StageDetails
                stageId={id}
                modalId={modalId}
              />
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}

Sequence.propTypes = {
  lead_id: T.string.isRequired,
}

export default Sequence;
