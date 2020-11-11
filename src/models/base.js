import axios from 'axios';

export const BASE_BACKEND_PROXY_URL = 'http://172.28.128.7:4000/proxy/v1/';

const TYPE = '';

export class Base {
	static client = axios;
	static proxyUrl = BASE_BACKEND_PROXY_URL;
	static url = '';

	static async find(id, query={}) {
    return await this.client.get(`${this.url}/${id}`);
  }

  static async findAll(query={}) {
    return await this.client.get(`${this.url}`);
  }
}

export default Base;