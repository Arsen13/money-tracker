import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://money-tracker-backend-snowy.vercel.app/api',
  withCredentials: true,
});
