import { api } from "@/lib/axios";

export const getCandidates = async ({
  stateCode,
  query,
}: {
  stateCode: string;
  query: string;
}) => {
  if (query) {
    const res = await api.get(
      `/v2/candidates?stateCode=${stateCode}&search=${query}`,
    );
    const data = res.data
    console.log(`candidates by state${stateCode} by search${query} data`,data);
    return res.data.data;
  }
  const res = await api.get(`/v2/candidates?stateCode=${stateCode}`);
  const data = res.data.data
  console.log("candidates.....", res.data.data);
  console.log("candidate by stateCode", stateCode, "data:", data.data);
  return res.data.data;
};

export const deleteCandidate = async (id: number) => {
  const res = await api.delete(`/v2/candidates/${id}`);
  console.log("Deleted Candidate:", res.data);
  return res.data.data;
};

export const getCandidateById = async (id: number) => {
  const res = await api.get(`/v1/admin/candidates/${id}`);
  console.log("Candidate Details:", res.data);
  return res.data.data;
};
