import SignUpForm from "../components/signup/SignUpForm";

export default function SignUp() {
  return (
    <>
      <div className="flex mx-auto mt-36 border p-6 border-amber-100 rounded-md max-w-lg flex-col items-center justify-center">
        <div className="flex items-center justify-center text-center">
          <h1 className="text-2xl">
            Sign Up
          </h1>
        </div>
        <SignUpForm />
        <button className="mt-3 border border-amber-100 rounded-md px-6 py-2">
          SignUp
        </button>
      </div>
    </>
  )
}