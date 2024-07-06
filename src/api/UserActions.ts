import axios from "axios";
import IUser from "../DataModel/IUser";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const GetUsers = async (): Promise<IUser[]> => {
  var respone = await api.get("users");
  return respone.data.users;
};

export const CreateUsers = async (user: any) => {
  var respone = await api.post("users/add", user);
  return respone.data;
};

export const UpdateUsers = async (user: any, id: number) => {
  var respone = await api.put(`users/${id}`, user);
  return respone.data;
};

export const DeleteUsers = async (id: number) => {
  var respone = await api.put(`users/${id}`);
  return respone.data;
};
