// services/roleService
import axios from "axios";
import { Role } from "../../types";
import { API_URL } from "../../config";

const ROLE_API = `${API_URL}/roles`; // Endpoint cho roles

// Lấy danh sách tất cả roles
export const getRoles = async (): Promise<Role[]> => {
  try {
    const response = await axios.get<Role[]>(ROLE_API);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách roles:", error);
    throw error;
  }
};

// Lấy thông tin role theo ID
export const getRoleById = async (roleId: string): Promise<Role> => {
  try {
    const response = await axios.get<Role>(`${ROLE_API}/${roleId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy role:", error);
    throw error;
  }
};

// Tạo role mới
export const createRole = async (roleData: Omit<Role, "id">): Promise<Role> => {
  try {
    const response = await axios.post<Role>(ROLE_API, roleData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo role:", error);
    throw error;
  }
};

// Cập nhật role theo ID
export const updateRole = async (
  roleId: string,
  roleData: Partial<Role>
): Promise<Role> => {
  try {
    const response = await axios.patch<Role>(`${ROLE_API}/${roleId}`, roleData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật role:", error);
    throw error;
  }
};

// Xóa role theo ID
export const deleteRole = async (roleId: string): Promise<boolean> => {
  try {
    await axios.delete(`${ROLE_API}/${roleId}`);
    return true; // Trả về true nếu xóa thành công
  } catch (error) {
    console.error("Lỗi khi xóa role:", error);
    throw error;
  }
};
