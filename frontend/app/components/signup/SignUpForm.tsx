'use client';

import Link from "next/link";
import AuthButton from "../Auth/AuthButton";
import InputField from "../Auth/InputField";
import { SignUpSchema } from "@/lib/types";
import toast from "react-hot-toast";

export default function SignUpForm() {

  const signUp = async (formData: FormData) => {
    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    }
    const result = SignUpSchema.safeParse(userData);

    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach((issue) => errorMessage += `${issue.path[0]}: ${issue.message}. \n`);
      toast.error(errorMessage);
      return;
    }

    console.log(result.data);
  }

  return (
    <form action={signUp} className="w-72 mt-4">
      <InputField
        type="text"
        name="firstName"
        label="First name"
        placeholder="John"
      />

      <InputField
        type="text"
        name="lastName"
        label="Last name"
        placeholder="Doe"
      />

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
      
      <InputField
        type="password"
        name="confirmPassword"
        label="Confirm password"
        placeholder="qwerty"
      />

      <div className="flex flex-col my-2">
        <Link href='/login' className="hover:underline">
            Already have an account?
        </Link>

        <AuthButton title={'SignUp'} />
      </div>
    </form>
  )
}