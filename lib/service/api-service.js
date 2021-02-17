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

export const axiosGetStudentById = async (id) => {
  return await axiosInstanceAuthen().get(
    `/students/${id}`
  );
};

export const axiosUpdateStudents = async (name, country, email, type, id) => {
  return await axiosInstanceAuthen().put(`/students`, {
    id: id,
    name: name,
    country: country,
    email: email,
    type: type,
  });
};

export const axiosDeleteStudents = async (id) => {
  return await axiosInstanceAuthen().delete(`/students/${id}`);
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
