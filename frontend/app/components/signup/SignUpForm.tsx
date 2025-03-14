'use client';

export default function SignUpForm() {
  return (
    <form className="w-72 mt-4">
      <div className="flex flex-col my-2">
        <label>
          <span>First name</span>
        </label>
        <input
          type="text"
          name="firstName"
          placeholder="John"
          className="h-8 border border-amber-100 rounded-md placeholder:p-2 placeholder:text-sm placeholder:italic"
        />
      </div>

      <div className="flex flex-col my-2">
        <label>
          <span>Last name</span>
        </label>
        <input
          type="text"
          name="lastName"
          placeholder="Doe"
          className="h-8 border border-amber-100 rounded-md placeholder:p-2 placeholder:text-sm placeholder:italic"
        />
      </div>

      <div className="flex flex-col my-2">
        <label>
          <span>Email</span>
        </label>
        <input
          type="text"
          name="email"
          placeholder="johndoe@gmail.com"
          className="h-8 border border-amber-100 rounded-md placeholder:p-2 placeholder:text-sm placeholder:italic"
        />
      </div>

      <div className="flex flex-col my-2">
        <label>
          <span>Password</span>
        </label>
        <input
          type="password"
          name="password"
          placeholder="qwerty"
          className="h-8 border border-amber-100 rounded-md placeholder:p-2 placeholder:text-sm placeholder:italic"
        />
      </div>

      <div className="flex flex-col my-2">
        <label>
          <span>Confirm password</span>
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="qwerty"
          className="h-8 border border-amber-100 rounded-md placeholder:p-2 placeholder:text-sm placeholder:italic"
        />
      </div>
    </form>
  )
}