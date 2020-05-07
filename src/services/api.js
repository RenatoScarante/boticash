import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: "json"
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem("@token");

  if (token) {
    config.headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }

  return config;
});

export default api;
