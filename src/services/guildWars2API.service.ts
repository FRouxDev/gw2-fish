import axios from 'axios';

export const baseUrl: string = import.meta.env.VITE_APP_API_URL || 'https://api.guildwars2.com/v2';
export const uploadUri = `${baseUrl}cards/upload`;
export const importUri = `${baseUrl}cards/import`;

class GW2APIRequestService {
  async get(path: string, queryParams: any = {}, bodyParams: any = {}): Promise<any> {
    queryParams.access_token = 'B6FB7742-2993-F84F-A037-CEFD827E6A23B7331DD5-7016-4711-9544-A7ECF835E87A';
    const axiosConfig = {
      params: queryParams,
      // data: bodyParams,
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

export default new GW2APIRequestService();
