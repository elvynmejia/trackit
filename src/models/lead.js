import axios from 'axios';

export const BASE_BACKEND_PROXY_URL = 'http://172.28.128.7:4000/proxy/v1/';

export const TYPE = 'leads';

export default class Lead {
  static TYPE = TYPE;
  static url = `${BASE_BACKEND_PROXY_URL}/${TYPE}`;

  static async find(id, query={}) {
    return await axios.get(`${this.url}/${id}`);
  }
}