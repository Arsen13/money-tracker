import toast from 'react-hot-toast';
import { LoginSchema, SignUpSchema } from './types';
import { AxiosError } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function login(formData: FormData, router: AppRouterInstance) {
  const result = LoginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    let errorMessage = '';
    result.error.issues.forEach(
      (issue) => (errorMessage += `${issue.path[0]}: ${issue.message}. \n`)
    );
    toast.error(errorMessage);
    return;
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    });
    console.log('action', response);
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
    } else toast.error('Login failed');
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message);
    } else {
      console.log(error);
    }
  }
}

export async function signup(formData: FormData, router: AppRouterInstance) {
  const result = SignUpSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    let errorMessage = '';
    result.error.issues.forEach(
      (issue) => (errorMessage += `${issue.path[0]}: ${issue.message}. \n`)
    );
    toast.error(errorMessage);
    return;
  }

  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
    } else toast.error('Signup failed');
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message);
    } else {
      console.log(error);
    }
  }
}

export async function logout(router: AppRouterInstance) {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) router.push('/login');
    else toast.error('Logout error');
  } catch (error) {
    toast.error(String(error));
  }
}
