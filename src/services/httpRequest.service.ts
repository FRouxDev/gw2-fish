import axios from 'axios';

export const baseUrl: string = import.meta.env.VITE_APP_API_URL || 'https://gw2fishing.an-d.me/api/fr';
export const uploadUri = `${baseUrl}cards/upload`;
export const importUri = `${baseUrl}cards/import`;

class HttpRequestService {
  async get(path: string, queryParams = {}, bodyParams = {}): Promise<any> {
    const axiosConfig = {
      params: queryParams,
      data: bodyParams,
    };

    const url = `${baseUrl}${path}`;

    try {
      const objects = await axios.get(url, axiosConfig);
      return objects.data;
    } catch (err) {
      throw new Error(`API Error (GET): ${err}`);
    }
  }

  async post(path: string, bodyParams = {}): Promise<any> {
    const axiosConfig = {
      data: bodyParams,
    };

    const url = `${baseUrl}${path}`;

    try {
      const objects = await axios.post(url, axiosConfig);
      return objects.data;
    } catch (err) {
      throw new Error(`API Error (POST): ${err}`);
    }
  }

  async put(path: string, queryParams = {}, bodyParams = {}): Promise<any> {
    const axiosConfig = {
      params: queryParams,
      data: bodyParams,
    };

    const url = `${baseUrl}${path}`;

    try {
      const objects = await axios.put(url, axiosConfig);
      return objects.data;
    } catch (err) {
      throw new Error(`API Error (PUT): ${err}`);
    }
  }

  async delete(path: string, queryParams = {}, bodyParams = {}): Promise<any> {
    const axiosConfig = {
      params: queryParams,
      data: bodyParams,
    };

    const url = `${baseUrl}${path}`;

    try {
      const objects = await axios.delete(url, axiosConfig);
      return objects.data;
    } catch (err) {
      throw new Error(`API Error (DELETE): ${err}`);
    }
  }
}

export default new HttpRequestService();
