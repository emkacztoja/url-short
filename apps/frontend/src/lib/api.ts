import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.i.emkacz.dev';

export const shortenUrl = async (payload: { originalUrl: string; customAlias?: string }) => {
  const { data } = await axios.post(`${API_URL}/api/shorten`, payload);
  return data;
};

