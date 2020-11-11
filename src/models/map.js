import Lead, { TYPE as LEAD_TYPE } from './lead';
import Stage, { TYPE as STAGE_TYPE } from './stage';

export const modelTypeToModelMap = {
  [LEAD_TYPE]: Lead,
  [STAGE_TYPE]: Stage,
}

export default modelTypeToModelMap;