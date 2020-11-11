import Base from './base';

export const TYPE = 'stages';

export class Stage extends Base {
  static TYPE = TYPE;
  static url = `${this.proxyUrl}/${this.TYPE}`;
}

export default Stage;