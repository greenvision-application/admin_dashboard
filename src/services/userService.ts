// services/userService.ts
import axios from "axios";
import { Users } from "../types/Model";
import { API_URL } from "../config";

const USER_API = `${API_URL}/users`; // Endpoint cho users

  // Lấy danh sách tất cả users
  export const getUsers = async (): Promise<Users[]> => {
    try {
      const response = await axios.get<Users[]>(USER_API);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách users:", error);
      throw error;
    }
  };

// Lấy thông tin user theo ID
export const getUserById = async (userId: string): Promise<Users> => {
  try {
    const response = await axios.get<Users>(`${USER_API}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy user:", error);
    throw error;
  }
};

// Tạo user mới
export const createUser = async (userData: Omit<Users, 'id'>) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Có lỗi xảy ra khi tạo user');
    }

    return result;
  } catch (error: any) {
    console.error('Lỗi API createUser:', error.message);
    throw new Error(error.message);
  }
};



// Cập nhật user theo ID
export const updateUser = async (userId: string, userData: Partial<Users>): Promise<Users> => {
  try {
    const response = await axios.patch<Users>(`${USER_API}/${userId}`, userData);

    if (response.status !== 200) {
      throw new Error(`Lỗi cập nhật user: ${response.statusText}`);
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Lỗi từ phía server (HTTP response)
      console.error("Lỗi từ server khi cập nhật user:", error.response.data);
      throw new Error(error.response.data?.message || "Lỗi từ server khi cập nhật user");
    } else if (error.request) {
      // Lỗi khi không nhận được phản hồi từ server
      console.error("Không nhận được phản hồi từ server:", error.request);
      throw new Error("Không thể kết nối đến server, vui lòng thử lại sau");
    } else {
      // Các lỗi khác (cấu hình sai, lỗi không xác định)
      console.error("Lỗi khi cập nhật user:", error.message);
      throw new Error(error.message || "Có lỗi xảy ra khi cập nhật user");
    }
  }
};



// Xóa user theo ID
export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    await axios.delete(`${USER_API}/${userId}`);
    return true; // Trả về true nếu xóa thành công
  } catch (error) {
    console.error("Lỗi khi xóa user:", error);
    throw error;
  }
};
