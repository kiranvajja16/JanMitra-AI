import api from "./api";

export const getHistory = async () => {
  const response = await api.get("/history");
  return response.data;
};

export const deleteHistory = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

export const getHistoryById = async (id) => {
  const response = await api.get(`/history/${id}`);
  return response.data;
};