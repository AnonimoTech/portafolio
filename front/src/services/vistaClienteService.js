import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL + '/vista-cliente';

export const getVistaPorCliente = async (clienteId, token) => {
  const res = await axios.get(`${API_URL}/cliente/${clienteId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createVistaCliente = async (data, token) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const updateVistaCliente = async (id, data, token) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const deleteVistaCliente = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getTodasLasVistas = async (token) => {
  const res = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
