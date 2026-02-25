import { api } from "@/lib/axios";
import { OfficeType } from "../schemas/admin_schema";

export const getOfficeTypes = async () => {
    const res = await api.get(`/v1/admin/elections/officeType`);
    return res.data.data;
}

export const postOfficeType = async (officeTypeData: any) => {
    const res = await api.post(`/v1/admin/elections/officeType`, officeTypeData);
    return res.data.data;
}

export const updateOfficeType = async ( officeTypeData: OfficeType) => {
    const res = await api.put(`/v1/admin/elections/officeType/`, officeTypeData);
    return res.data.data;
}

export const deleteOfficeType = async (id: number) => {
    const res = await api.delete(`/v1/admin/elections/officeType/${id}`);
    return res.data.data;
}

export const fetchElectionLevels = async () => {
  const res = await api.get(`/v1/domain/electionLevel`);
  return res.data.data;
}