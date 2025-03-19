import axios from "axios";
import { API_URL } from "../config";
import { Plant } from "../types/Model";

const PLANTS_API = `${API_URL}/plants`;

export const plantService = {
  // Lấy danh sách cây trồng
  async getPlants(): Promise<Plant[]> {
    const response = await axios.get(PLANTS_API);
    return response.data;
  },

  // Lấy thông tin chi tiết của một cây trồng
  async getPlantById(id: string): Promise<Plant> {
    const response = await axios.get(`${PLANTS_API}/${id}`);
    return response.data;
  },

  // Thêm cây trồng mới
  async createPlant(data: Omit<Plant, "id" | "created_at" | "Category">): Promise<Plant> {
    const response = await axios.post(PLANTS_API, data);
    return response.data;
  },

  // Cập nhật cây trồng
  async updatePlant(id: string, data: Partial<Plant>): Promise<Plant> {
    const response = await axios.patch(`${PLANTS_API}/${id}`, data);
    return response.data;
  },

  // Xóa cây trồng
  async deletePlant(id: string): Promise<void> {
    await axios.delete(`${PLANTS_API}/${id}`);
  },
};
