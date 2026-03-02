import { api } from "@/lib/axios";
import { Credentials } from "@/store/types/user";
import axios from "axios";
import { RegisterFormSchemaTypes } from "../schemas/register_schema";
import { encodeForLogin } from "@/lib/helpers/auth";

export async function signUp(data:RegisterFormSchemaTypes){
  const res =await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/v1/user/register`,data)
  console.log(res.data)
  return res.data.data
}

export async function loginUser(data: Credentials) {
  console.log("login api hit")
  const payload = {
    userName: encodeForLogin(data.userName),
    password: encodeForLogin(data.password),
  };
  console.log("login payload",payload)
  
  console.log("api",process.env.EXPO_PUBLIC_API_URL)
  const res = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/auth/login`,
    payload,
  );
  console.log(res)
  if (res.data?.code !== 1) {
    console.log(res.data)
    throw new Error(res.data?.message || "Login failed");
  }
  return res.data.data;
}

export async function logoutUser(){
    const res = await api.post(`/v1/auth/logout`)
    return res.data
}

export async function refreshToken(){
  const res = await api.get("/v1/auth/refresh")
  return res.data
}