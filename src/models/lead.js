import Base from './base';

export const TYPE = 'leads';

export class Lead extends Base {
  static TYPE = TYPE;
  static url = `${this.proxyUrl}/${this.TYPE}`;
}

export default Lead;