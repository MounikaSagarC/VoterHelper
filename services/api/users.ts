import { api } from "@/lib/axios";

export const getUsers = async ({
  status,
  query,
  page,
  size,
}: {
  status: string | number;
  query: string;
  page: number;
  size: number;
}) => {
  const url = query
    ? `/v1/admin/users?status=${status}&search=${query}&page=${page}&size=${size}`
    : `/v1/admin/users?status=${status}&page=${page}&size=${size}`;
  const res = await api.get(url);
  const data = res.data.data;
  console.log("users", data, "status", status);
  return res.data.data.content;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete(`/v1/admin/users/${id}`);
  console.log("update status", res.data);
  return res.data.data;
};
