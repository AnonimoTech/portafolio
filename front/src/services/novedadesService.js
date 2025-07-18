import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL + '/novedades';

export const getNovedades = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createNovedad = async (data, token) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  
  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const updateNovedad = async (id, data, token) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const deleteNovedad = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getNovedadById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
