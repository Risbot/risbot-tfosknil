import axios from 'axios';

export const get = async (path: string) =>
  axios.get(
    `${process.env.REACT_APP_API_SERVER}${process.env.REACT_APP_API_PATH}${path}`,
    {
      withCredentials: true,
    }
  );

export const post = async (path: string, data: any) =>
  axios.post(
    `${process.env.REACT_APP_API_SERVER}${process.env.REACT_APP_API_PATH}${path}`,
    data,
    {
      withCredentials: true,
    }
  );
