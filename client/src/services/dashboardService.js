// dashboardService.js

import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/history/stats");
  return response.data;
};