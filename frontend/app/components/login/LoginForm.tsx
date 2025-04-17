'use client';

import Link from 'next/link';
import AuthButton from '../Auth/AuthButton';
import InputField from '../Auth/InputField';
import { login } from '@/lib/authActions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    try {
      await login(formData, router);
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <form action={handleLogin}>
      <InputField
        type='text'
        name='email'
        label='Email'
        placeholder='johndoe@gmail.com'
      />

      <InputField
        type='password'
        name='password'
        label='Password'
        placeholder='qwerty'
      />

      <div className='my-2 flex flex-col'>
        <Link href='/signup' className='hover:underline'>
          Don't have an account?
        </Link>

        <AuthButton title={'Login'} />
      </div>
    </form>
  );
}
