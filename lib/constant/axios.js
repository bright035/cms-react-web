import axios, { AxiosError } from 'axios';


export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://cms.chtoma.com/api',
    responseType: 'json',
  });

export const axiosInstanceAuthen = ()=>{
  return (
    axios.create({
    withCredentials: true,
    baseURL: 'https://cms.chtoma.com/api',
    responseType: 'json',
    headers:{
      "Authorization":
      `Bearer ${JSON.parse(localStorage?.getItem("loginData")).token}`
    }
  })
  )
} 