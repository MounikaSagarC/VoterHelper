import { api } from "@/lib/axios"

export const getUsers = async ({
  status,
  query,
}: {
  status: string;
  query: string;
}) => {
  if (query) {
    const res = await api.get(
      `/v1/admin/users?status=${status}&search=${query}`,
    );
    const data = res.data
    console.log(data)
    return res.data.data;
  }
  const res = await api.get(`/v1/admin/users?status=${status}`);
  const data = res.data
  console.log(data)
  return res.data.data;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete(`/v1/admin/users/${id}`);
  console.log("update status",res.data)
  return res.data.data;
};