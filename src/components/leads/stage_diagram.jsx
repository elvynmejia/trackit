import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Diagram, {
  createSchema,
} from 'beautiful-react-diagrams';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';

import { makeStyles } from '@material-ui/core/styles';

import { findAll } from 'actions/api';
import { TYPE as STAGE_TYPE} from 'models/stage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: theme.spacing(1),
    padding: theme.spacing(1),
    height: theme.spacing(10),
    width: theme.spacing(20),
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
  diagram: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(20),
    backgroundColor: 'none !important',
    background: 'none !important',
  }
}));

const StageDiagram = ({ lead_id }) => {
  const classes = useStyles();
  const { innerWidth: width } = window;

  const dispatch = useDispatch();

  const stages = useSelector(state => {
    return Object.values(
      (
        state?.serverSide?.[STAGE_TYPE] || {}
      )?.[lead_id] ||
      {}
    )
  });

  useEffect(() => {
    dispatch(
      findAll({
        modelType: STAGE_TYPE,
        query: { lead_id },
        requestId: lead_id,
      })
    );
  }, []);

  let links = [];
  const xCoordinate = Math.floor(width / stages.length);
  const yCoordinate = 0;
  const nodes = stages.map((stage, index) => {
    const coordinates = [
      xCoordinate * index,
      yCoordinate,
    ];

    return {
      coordinates,
      content: `Stage ${index}`,
      id: `stage-${index}`,
      render: (props) => (
        <Node
          {...props}
          stage={stage}
          classes={classes}
          index={index}
        />
      )
    };
  });

  if (stages.length === 1) {
    links = [{
      input: 'stage-0',
      output: 'stage-0',
    }];
  } else {
    links = stages.slice(0, stages.length-1).map((stage, index) => {
      return {
        input: `stage-${index}`,
        output: `stage-${index + 1}`,
      };
    });
  }

  const schema = createSchema({
    nodes,
    links
  });

  return (
    <Box className={classes.box}>
      <Diagram
        className={classes.diagram}
        style={{ backgroundColor: 'none !important' }}
        key={lead_id}
        schema={schema}
        onChange={() => console.log('schema')}
      />
    </Box>
  )
}

export const Node = ({ content, stage, classes, index }) => (
  <Paper
    elevation={3}
    className={`${classes.root} ${classes[index + 1]}`}
    onClick={() => console.log(stage.id)}
  >
    <p>{content}</p>
    <p>{stage.state}</p>
  </Paper>
)

export default StageDiagram;
