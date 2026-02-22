import { api } from "@/lib/axios";

export const getQuestions = async () => {
    const res = await api.get(`/v1/admin/questions`);
    console.log("Questions:", res.data);
    return res.data.data;
}
export const postQuestion = async (questionData: any) => {
    const res = await api.post(`/v1/admin/questions`, questionData);
    console.log("New Question:", res.data);
    return res.data.data;
}

export const updateQuestion = async ( questionData: any) => {
    const res = await api.put(`/v1/admin/questions/`, questionData);
    console.log("Updated Question:", res.data);
    return res.data.data;
}

export const deleteQuestion = async (id: number) => {
    const res = await api.delete(`/v1/admin/questions/${id}`);
    console.log("Deleted Question:", res.data);
    return res.data.data;
}

export const getQuestionsById = async (id: number) => {
    const res = await api.get(`/v1/admin/questions/${id}`);
    console.log("Question Details:", res.data);
    return res.data.data;
}

export const getQuestionsByState = async (state: string) => {
    const res = await api.get(`/v1/admin/questions/${state}`);
    console.log(`Questions for ${state}:`, res.data);
    return res.data.data;
}