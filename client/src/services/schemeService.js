import api from "./api";

export const checkEligibility = async (userData) => {
  const response = await api.post(
    "/schemes/check-eligibility",
    userData
  );

  return response.data;
};