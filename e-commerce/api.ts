import axios from "axios";

export const backendAPI = axios.create({
  baseURL: process.env.BACKEND_API_URL,
  validateStatus: (status) => status < 500,
});
