import React, { useEffect }from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import Diagram, {
  createSchema,
} from 'beautiful-react-diagrams';

import { findAll } from 'actions/api';

import { TYPE as STAGE_TYPE} from 'models/stage';

const StageDiagram = ({ lead_id }) => {

  const { innerWidth: width } = window;

  const dispatch = useDispatch();

  const allStages = useSelector(state => {
    return get(state.serverSide, [STAGE_TYPE], {});
  });

  const getStages = (lead_id) => {
    return Object.values(
      get(allStages, [lead_id], {})
    )
  }

  useEffect(() => {
    dispatch(
      findAll({
        modelType: STAGE_TYPE,
        query: { lead_id },
        requestId: lead_id,
      })
    );
  }, []);

  const getSchema = (id) => {
    const stages = getStages(id);
    const nodes = stages.map((stage, index) => {

      const coordinates = [
        Math.floor(width / stages.length) * index,
        0,
      ];

      return {
        coordinates,
        content: `Stage ${index}`,
        id: `stage-${index}`,
      };
    });

    let links = [];

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

    return {
      nodes,
      links,
    };
  }

  const schema = createSchema(getSchema(lead_id));

  return (
    <Diagram
      key={lead_id}
      schema={schema}
      onChange={() => console.log('schema')}
    />
  )
}
export default StageDiagram;
