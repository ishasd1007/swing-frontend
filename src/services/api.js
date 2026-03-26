import axios from "axios";

const API = axios.create({
  baseURL: "https://swing-backend-2.onrender.com/api"
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
