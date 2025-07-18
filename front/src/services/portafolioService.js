import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL + '/portafolio';

export const getPortafolio = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getDestacados = async () => {
  const res = await axios.get(API_URL);
  return res.data.filter(p => p.destacado);
};

export const createProyecto = async (data, token) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === 'galeria') {
      for (const img of data.galeria) {
        formData.append('galeria', img);
      }
    } else if (key === 'destacado') {
      formData.append('destacado', data.destacado ? "true" : "false"); // ✅ corregido
    } else {
      formData.append(key, data[key]);
    }
  }

  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};


export const updateProyecto = async (id, data, token) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === 'galeria') {
      for (const img of data.galeria) {
        formData.append('galeria', img);
      }
    } else if (key === 'destacado') {
      formData.append('destacado', data.destacado ? "true" : "false"); // ✅ corregido
    } else {
      formData.append(key, data[key]);
    }
  }

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};


export const deleteProyecto = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
