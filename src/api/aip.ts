import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Lấy URL của backend từ biến môi trường

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
