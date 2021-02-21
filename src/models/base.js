import axios from 'axios';

export const BASE_BACKEND_PROXY_URL = process.env.REACT_APP_BASE_BACKEND_PROXY_URL;

const client = axios.create({
  baseURL: BASE_BACKEND_PROXY_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export class Base {
	static client = client;
	static proxyUrl = BASE_BACKEND_PROXY_URL;
	static url = '';

	static async find(id, query={}) {
	  const url = `${this.url}/${id}`;
	  return await this.client.get(url, { params: query });
	}

	static async findAll(query={}) {
	  return await this.client.get(this.url, { params: query });
	}

	static async create(body) {
	  return await this.client.post(this.url, { ...body });
	}

	static async update(id, body) {
	  const url = `${this.url}/${id}`;
	  return await this.client.patch(url, { ...body });
	}

	static async delete(id) {
	  const url = `${this.url}/${id}`;
	  return await this.client.delete(url);
	}
}

export default Base;
