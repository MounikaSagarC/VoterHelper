import { api } from "@/lib/axios";
import { Credentials } from "@/store/types/user";
import axios from "axios";
import { RegisterFormSchemaTypes } from "../schemas/register_schema";
import { encodeForLogin } from "@/lib/helpers/auth";

export async function signUp(data:RegisterFormSchemaTypes){
  const res =await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/v1/user/register`,data)
  return res.data.data
}

export async function loginUser(data: Credentials) {
  const payload = {
    userName: encodeForLogin(data.userName),
    password: encodeForLogin(data.password),
  };
  
  const res = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/auth/login`,
    payload,
  );
  if (res.data?.code !== 1) {
    throw new Error(res.data?.message || "Login failed");
  }
  return res.data.data;
}

export async function logoutUser(){
    const res = await api.post(`/v1/auth/logout`)
    return res.data
}
