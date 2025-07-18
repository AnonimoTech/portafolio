import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL + '/auth';

export const login = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data;
};

export const checkToken = async (token) => {
  const res = await axios.get(`${API_URL}/check`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getAllUsers = async (token) => {
  const res = await axios.get(`${API_URL}/usuarios`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteUser = async (id, token) => {
  const res = await axios.delete(`${API_URL}/usuarios/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateUser = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/usuarios/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
