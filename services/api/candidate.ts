import { api } from "@/lib/axios";

export const getCandidates = async () => {
    const res = await api.get(`/v2/candidates`);
    console.log("Candidates:", res.data);
    return res.data.data;
}
export const postCandidate = async (candidateData: any) => {
    const res = await api.post(`/v1/admin/candidates`, candidateData);
    console.log("New Candidate:", res.data);
    return res.data.data;
}

export const updateCandidate = async (id: number, candidateData: any) => {
    const res = await api.put(`/v1/admin/candidates/${id}`, candidateData);
    console.log("Updated Candidate:", res.data);
    return res.data.data;
}

export const deleteCandidate = async (id: number) => {
    const res = await api.delete(`/v2/candidates/${id}`);
    console.log("Deleted Candidate:", res.data);
    return res.data.data;
}

export const getCandidateById = async (id: number) => {
    const res = await api.get(`/v1/admin/candidates/${id}`);
    console.log("Candidate Details:", res.data);
    return res.data.data;
}