import { api } from "@/lib/axios";
import { Party } from "../schemas/admin_schema";

export const fetchParties = async () => {
  const res = await api.get(`/v1/admin/elections/party`);
  return res.data.data;
}

export const createParty = async (party: Party) => {
  const res = await api.post(`/v1/admin/elections/party`, party);
  return res.data.data;
}

export const updateParty = async (party: Party) => {
  const res = await api.put(`/v1/admin/elections/party`,party);
  return res.data;
}

export const inActivateParty = async(Id: number) => {
  const res = await api.delete(`/v1/admin/elections/party/${Id}`);
  return res.data.data;
}