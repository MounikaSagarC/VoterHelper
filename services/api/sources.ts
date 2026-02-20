import { api } from "@/lib/axios";
import { Source } from "../schemas/admin_schema";

export const fetchSources = async () => {
  const res = await api.get(`/v1/admin/elections/source`);
  return res.data.data;
}

export const createSource = async (source: Source) => {
  const res = await api.post(`/v1/admin/elections/source`, source);
  return res.data.data;
}

export const updateSource = async (source: Source) => {
  const res = await api.put(`/v1/admin/elections/source`,source);
  return res.data;
}

export const deleteSource = async(Id: number) => {
  const res = await api.delete(`/v1/admin/elections/source/${Id}`);
  return res.data.data;
}