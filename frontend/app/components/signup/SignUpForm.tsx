'use client';

import Link from "next/link";
import AuthButton from "../Auth/AuthButton";
import InputField from "../Auth/InputField";
import toast from "react-hot-toast";
import { signup } from "@/lib/authActions";
import { useRouter } from "next/navigation";

export default function SignUpForm() {

  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    try {
      await signup(formData, router);
    } catch (error) {
      toast.error(String(error));
    }
  }

  return (
    <form action={handleSignUp} className="w-72 mt-4">
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