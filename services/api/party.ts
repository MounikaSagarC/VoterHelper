import { api } from "@/lib/axios";
import { Party } from "../schemas/admin_schema";

export const fetchParties = async () => {
  try {
    console.log("hit fetchParty");
    const res = await api.get(`/v1/admin/elections/party`);
    console.log("fetch Party api", res);
    return res.data.data;
  } catch (error: any) {
    console.log("fetch Party error", error);
    throw error; // IMPORTANT
  }
};

export const createParty = async (party: Party) => {
  const res = await api.post(`/v1/admin/elections/party`, party);
  console.log("updatePArty",res.data)
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