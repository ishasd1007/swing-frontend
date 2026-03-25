import axios from "axios";

const API = "https://swing-backend-eejk.onrender.com/api";  // 🔥 MUST

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API}/auth/register`, data);
  return res.data;
};