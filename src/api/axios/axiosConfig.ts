// src/api/axiosConfig.ts

import axios from "axios";
import { API_URL } from "../../config";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'; // Import SweetAlert2

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (window.location.pathname !== '/login') {
        Swal.fire({
          title: 'Phiên đăng nhập hết hạn',
          text: 'Vui lòng đăng nhập lại để tiếp tục.',
          icon: 'warning',
          confirmButtonText: 'Đăng nhập',
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // Chuyển hướng đến trang đăng nhập nếu người dùng xác nhận
            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
          }
        });  
      }
      // Sử dụng SweetAlert2 để hiển thị thông báo xác nhận đăng nhập
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;