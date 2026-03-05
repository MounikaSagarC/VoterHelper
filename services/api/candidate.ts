import { api } from "@/lib/axios";

export const getCandidates = async (stateCode: string | number, query: string ,page:number,size:number) => {
  if (query) {
    const res = await api.get(
      `/v2/candidates?stateCode=${stateCode}&search=${query}&page=${page}&size=${size}`,
    );
    return res.data.data;
  }
  const res = await api.get(`/v2/candidates?stateCode=${stateCode}&page=${page}&size=${size}`);
  return res.data.data;
};

export const deleteCandidate = async (id: number) => {
  const res = await api.delete(`/v2/candidates/${id}`);
  return res.data.data;
};

export const getCandidateById = async (id: number) => {
  const res = await api.get(`/v1/admin/candidates/${id}`);
  return res.data.data;
};
