import { api } from "@/lib/axios";
import { Category } from "../schemas/admin_schema";

export const fetchCategories = async () => {
  const res = await api.get(`/v1/admin/categories`);
  console.log("categories",res.data.data)
  return res.data.data;
}

export const createCategory = async (category: Category) => {
  const res = await api.post(`/v1/admin/categories`, category);
  return res.data.data;
}

export const updateCategory = async (category: {
  categoryId: number;
  name: string;
  description?: string;
  displayOrder: number;
}) => {
  const res = await api.put(`/v1/admin/categories`,category);
  console.log("API RESPONSE:", res.data); // DEBUG
  return res.data;
}

export const deleteCategory = async(Id: number) => {
  const res = await api.delete(`/v1/admin/categories/${Id}`);
  return res.data.data;
}

export const fetchCategoryById = async (id: number) => {
  const res = await api.get(`/v1/admin/categories/${id}`);
  return res.data.data;
}

