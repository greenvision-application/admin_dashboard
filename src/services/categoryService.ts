import axios from "axios";
import { Category } from "../types/Model";
import { API_URL } from "../config";

const CATEGORY_API = `${API_URL}/categories`;

export const categoryService = {
    async getAllCategories (): Promise<Category[]> {
        try {
          const response = await axios.get<Category[]>(CATEGORY_API);
          return response.data;
        } catch (error) {
          console.error("Error fetching categories:", error);
          throw error;
        }
      },
      
      async getCategoryById (id: string): Promise<Category> {
        try {
          const response = await axios.get<Category>(`${CATEGORY_API}/${id}`);
          return response.data;
        } catch (error) {
          console.error("Error fetching category:", error);
          throw error;
        }
      },
      
      async createCategory (categoryData: Omit<Category, "id">): Promise<Category> {
        try {
          const response = await axios.post<Category>(CATEGORY_API, categoryData);
          return response.data;
        } catch (error) {
          console.error("Error creating category:", error);
          throw error;
        }
      },
      
      async updateCategory (id: string, categoryData: Partial<Category>): Promise<Category> {
        try {
          const response = await axios.patch<Category>(`${CATEGORY_API}/${id}`, categoryData);
          return response.data;
        } catch (error) {
          console.error("Error updating category:", error);
          throw error;
        }
      },
      
      async deleteCategory (id: string): Promise<boolean> {
        try {
          await axios.delete(`${CATEGORY_API}/${id}`);
          return true;
        } catch (error) {
          console.error("Error deleting category:", error);
          throw error;
        }
      }
};