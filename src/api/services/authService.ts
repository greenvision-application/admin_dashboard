// src/api/services/authService.ts
import { axiosInstance } from "../../api";
import Cookies from 'js-cookie';

const AUTH_API = "/auth";

export const login = async (usernameOrEmail: string, password: string): Promise<string> => {
  try {
    const response = await axiosInstance.post<{ token: string }>(`${AUTH_API}/login`, {
      usernameOrEmail,
      password,
    });
    console.log("dữ liệu sau đăng nhập",response.data)
    const  tokenData  = String (response.data);
    console.log("token",tokenData);
     
     // Lưu token vào cookies
    Cookies.set('token', tokenData, { expires: 1 }); // expires: 1 là 1 ngày
    return tokenData;
  } catch (error: any) {
    console.error("Lỗi khi đăng nhập:", error.message);
    
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
  }
};

export const logout = (): void => {
  Cookies.remove('token');
};

export const isAuthenticated = (): boolean => {
  //kiểm tra xem có tồn tại token ko
  return !!Cookies.get('token');
};