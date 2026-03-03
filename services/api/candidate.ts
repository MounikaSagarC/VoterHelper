import { api } from "@/lib/axios";

export const getCandidates = async ({
  stateCode,
  query,
}: {
  stateCode: string | number;
  query: string;
}) => {
  if (query) {
    const res = await api.get(
      `/v2/candidates?stateCode=${stateCode}&search=${query}`,
    );
    const data = res.data
    return res.data.data;
  }
  const res = await api.get(`/v2/candidates?stateCode=${stateCode}`);
  const data = res.data.data
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
