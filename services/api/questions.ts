// import { api } from "@/lib/axios";
// import { Question } from "../schemas/admin_schema";

import { api } from "@/lib/axios";
import { Question } from "../schemas/admin_schema";

// export const getQuestions = async () => {
//   const res = await api.get(`/v1/admin/questions`);
//   return res.data.data;
// };
export const postQuestion = async (questionData: Question) => {
  const res = await api.post(`/v1/admin/questions`, questionData);
  return res.data.data;
};

export const updateQuestion = async (questionData: Question) => {
  const res = await api.put(`/v1/admin/questions`, questionData);
  console.log(res.data)
  return res.data.data;
};

export const deleteQuestion = async (id: number) => {
  const res = await api.delete(`/v1/admin/questions/${id}`);
  return res.data.data;
};

export const getQuestionsById = async (id: number) => {
  const res = await api.get(`/v1/admin/questions/${id}`);
  return res.data.data;
};

export const getQuestionsByState = async (
  stateCode?: string | number,
  page = 0,
  size = 10,
  category?: string | number,
  search?: string
) => {

  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("size", String(size));

  if (search) params.append("search", search);
  if (stateCode) params.append("stateCode", String(stateCode));
  if (category) params.append("categoryId", String(category));
  const res = await api.get(`/v1/admin/questions?${params}`);


  return res.data.data;
};

