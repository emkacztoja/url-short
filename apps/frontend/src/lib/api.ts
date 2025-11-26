// @ts-nocheck
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.i.emkacz.dev';

const getAdminHeaders = () => {
  const key = typeof window !== 'undefined' ? localStorage.getItem('admin_api_key') : null;
  if (!key) return {};
  return { 'x-admin-api-key': key };
};

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

export const setAdminApiKey = (key: string | null) => {
  if (typeof window !== 'undefined') {
    if (key) localStorage.setItem('admin_api_key', key);
    else localStorage.removeItem('admin_api_key');
  }
};

export const fetchAdminUrls = async (params: { page?: number; perPage?: number; q?: string } = {}) => {
  const { data } = await axios.get(`${API_URL}/api/admin/urls`, {
    params,
    headers: getAdminHeaders(),
  });
  return data;
};

export const updateUrl = async (shortId: string, body: any) => {
  const { data } = await axios.patch(`${API_URL}/api/admin/urls/${shortId}`, body, { headers: getAdminHeaders() });
  return data;
};

export const deleteUrl = async (shortId: string) => {
  const { data } = await axios.delete(`${API_URL}/api/admin/urls/${shortId}`, { headers: getAdminHeaders() });
  return data;
};
