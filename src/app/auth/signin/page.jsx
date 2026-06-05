"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeSlash } from "@gravity-ui/icons";
import { Eye } from "@gravity-ui/icons";
import { signIn, signUp } from "@/lib/auth-client";

const Signin = () => {
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);
    try {
      const { data: authData, error } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });
      if (error) {
        alert(error.message);
      } else {
        alert("Account Created Successfully");
      }
    } catch (err) {
      alert("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false); // error হোক বা না হোক, loading বন্ধ
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-10 text-center mb-10">
      <h2 className="text-xl font-bold text-center">Login In Accounts</h2>
      <p>Login your accounts for further </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-10"
      >
        {/* Email Input */}
        <div className="flex flex-col gap-1  text-start">
          <label className="text-sm font-medium text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email", { required: true })}
            className="border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1  text-start">
          <label className="text-sm font-medium text-gray-700">
            Enter Your Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        {/* ✅ Submit Button — loading এ disabled হয় */}
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-600 text-white p-2 rounded-md font-semibold cursor-pointer hover:bg-amber-700 transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
