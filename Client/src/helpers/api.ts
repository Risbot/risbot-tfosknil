import axios from 'axios';

export const get = async (path: string) =>
  axios.get(`${process.env.API_SERVER}${process.env.API_PATH}${path}`, {
    withCredentials: true,
  });

export const postForm = async (path: string, data: any) =>
  axios.post(`${process.env.API_SERVER}${process.env.API_PATH}${path}`, data, {
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
