import api from "./api";

export const registerUser = async (userData) =>
  (await api.post("/auth/register", userData)).data;

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  if (response.data.token) localStorage.setItem("token", response.data.token);
  return response.data;
};

export const logoutUser = () => localStorage.removeItem("token");
