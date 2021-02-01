import { AES } from "crypto-js";
import { axiosInstance, axiosInstanceAuthen } from "../constant";

export const axiosPost = async (values) => {
  return await axiosInstance.post("/login", {
    email: values.email,
    password: AES.encrypt(values.password, "cms").toString(),
    role: values.role,
  });
};
export const axiosPostLogout = async () => {
  return await axiosInstanceAuthen().post("/logout");
};

export const axiosGetStudentsByPageAndQuery = async (query, page, limit) => {
  return await axiosInstanceAuthen().get(
    `/students?query=${query}&page=${page}&limit=${limit}`
  );
};

export const axiosPostStudents = async (name, country, email, type) => {
  return await axiosInstanceAuthen().post(`/students`, {
    name: name,
    country: country,
    email: email,
    type: type,
  });
};

export const axiosGetCountries = async () => {
  return await axiosInstanceAuthen().get(`/countries`);
};
