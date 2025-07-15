import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", baseURL);

export const api = axios.create({
  baseURL: `${baseURL}/api`,     
  withCredentials: true,         
});

api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const authToken = userInfo?.token;

 

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

