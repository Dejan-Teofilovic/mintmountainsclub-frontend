import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;