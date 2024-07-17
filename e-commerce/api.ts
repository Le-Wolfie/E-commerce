import axios from "axios";

export const authAPI = axios.create({
  baseURL: process.env.AUTH_API_URL,
  validateStatus: (status) => status < 500,
});
