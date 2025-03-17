'use client';

import Link from "next/link";
import AuthButton from "../Auth/AuthButton";
import toast from "react-hot-toast";
import { LoginSchema } from "@/lib/types";
import InputField from "../Auth/InputField";

export default function LoginForm() {

  const login = async (formData: FormData) => {

    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const result = LoginSchema.safeParse(userData);

    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach((issue) => errorMessage += `${issue.path[0]}: ${issue.message}. \n`);
      toast.error(errorMessage);
      return;
    }

    console.log(result.data)
  }

  return (
    <form action={login}>
      <InputField
        type="text"
        name="email"
        label="Email"
        placeholder="johndoe@gmail.com"
      />

      <InputField
        type="password"
        name="password"
        label="Password"
        placeholder="qwerty"
      />

      <div className="flex flex-col my-2">
        <Link href='/signup' className="hover:underline">
            Don't have an account?
        </Link>

        <AuthButton title={'Login'} />
      </div>
    </form>
  )
}