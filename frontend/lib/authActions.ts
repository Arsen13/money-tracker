import toast from "react-hot-toast";
import { LoginSchema, SignUpSchema } from "./types";
import { axiosInstance } from "./axiosInstance";
import { AxiosError } from "axios";

export async function login(formData: FormData, router: any) {
    const result = LoginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach((issue) => errorMessage += `${issue.path[0]}: ${issue.message}. \n`);
      toast.error(errorMessage);
      return;
    }

    try {
        const response = await axiosInstance.post('auth/login', result.data);
        const { token } = response.data;

        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        } 

        router.push('/');

    } catch(error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message);
        } else {
            console.log(error);
        }
    }
}

export async function signup(formData: FormData, router: any) {
    const result = SignUpSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach((issue) => errorMessage += `${issue.path[0]}: ${issue.message}. \n`);
      toast.error(errorMessage);
      return;
    }

    try {
        const response = await axiosInstance.post('user', result.data);
        const { token } = response.data;

        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
        
        router.push('/');

    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message);
        } else {
            console.log(error);
        }
    }
}