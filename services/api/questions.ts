import { api } from "@/lib/axios";
import { Question } from "../schemas/admin_schema";

export const getQuestions = async () => {
  const res = await api.get(`/v1/admin/questions`);
  return res.data.data;
};
export const postQuestion = async (questionData: any) => {
  const res = await api.post(`/v1/admin/questions`, questionData);
  return res.data.data;
};

export const updateQuestion = async (questionData: Question) => {
  const res = await api.put(`/v1/admin/questions`, questionData);
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

export const getQuestionsByState = async (state: string) => {
  if (state === "") {
    const res = await api.get(`/v1/admin/questions`);
    return res.data;
  } 
  const res = await api.get(`/v1/admin/questions/state?state=${state}`);
    return res.data;
  
}