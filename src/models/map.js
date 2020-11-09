import Lead, { TYPE as LEAD_TYPE } from './lead';

export const modelTypeToModelMap = {
  [LEAD_TYPE]: Lead,
}

export default modelTypeToModelMap;