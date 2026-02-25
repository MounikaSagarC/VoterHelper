import { DEFAULT_COUNTRY_ID } from "@/constants/location";
import { api } from "@/lib/axios";
import { Response } from "@/store/types/api";
import { ChangePassword } from "@/store/types/user";
import { AddressType, ProfileTypes } from "../schemas/profileSchema";

export const changePassword = async (data: ChangePassword) => {
  const res = await api.post("/v1/user/changePassword", data);
  return res.data;
};

export const userProfile = async () => {
  const res = await api.get<Response<ProfileTypes>>("/v1/userprofile");
  return res.data.data;
};

export const address = async (data: AddressType) => {
  const res = await api.post("/v1/user/addresses", data);
  return res.data;
};

export const getAddress = async () => {
  const res = await api.get<Response<AddressType[]>>("/v1/user/addresses");
  return res.data.data;
};

export const putAddress = async (id: number, data: AddressType) => {
  const { id: _, ...cleanData } = data;
  const payload = {
    ...cleanData,
    addressId: id,  
  };

  const res = await api.put(`/v1/user/addresses`, payload);

  return res.data;
};


export const deleteAddress = async (id: number) => {
  const res = await api.delete(`v1/user/addresses/${id}`);
  return res.data.data;
};

export const updateProfile = async (data: ProfileTypes) => {
  const res = await api.put("v1/userprofile", data);
  return res.data;
};

export const getStates = async () => {
  const res = await api.get(`/v1/dropdown/state?id=${DEFAULT_COUNTRY_ID}`);
  const stateData = res.data.data;
  return stateData
};

export const getCounty = async (stateId: string) => {
  const res = await api.get(`v1/dropdown/county?id=${stateId}`);
  const countyData = res.data.data;
  return countyData.map((item: any) => ({
    label: item.county,
    value: String(item.id),
  }));
};

export type ZipCodeMap = Record<string, number[]>;

export const getZipcodes = async (countyId: string) => {
  const res = await api.get(`/v1/dropdown/zipCodes?id=${countyId}`);

  const zipCodeMap: ZipCodeMap = res.data?.data?.zipCodes;

  if (!zipCodeMap || typeof zipCodeMap !== "object") {
    throw new Error("Invalid zipcode response");
  }
  return zipCodeMap; 
};
