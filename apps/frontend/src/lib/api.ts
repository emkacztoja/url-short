import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.i.emkacz.dev';

export const shortenUrl = async (payload: { originalUrl: string; customAlias?: string }) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/shorten`, payload);
    return data;
  } catch (err: any) {
    // Normalize axios errors to a predictable shape
    if (axios.isAxiosError(err) && err.response) {
      // throw an object with status and data so callers can inspect
      throw { status: err.response.status, data: err.response.data };
    }
    throw err;
  }
};
