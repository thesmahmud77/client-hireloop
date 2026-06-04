"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeSlash } from "@gravity-ui/icons";
import { Eye } from "@gravity-ui/icons";

const SignUpPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const imgFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", imgFile);
    const imgbbRes = await fetch(
      `https://api.imgbb.com/1/upload?key=d11b800a59dcca4d8f9ddb86c014f5f7`,
      {
        method: "POST",
        body: formData,
      },
    );
    const imgbbData = await imgbbRes.json();
    const photoURL = imgbbData.data.url;
    const userData = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      password: data.password,
      photo: photoURL, // database এ URL save হবে, file না
    };

    console.log(userData);
    setLoading(false); // ✅ শেষে loading off
    reset(); // ✅ form reset
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-10 text-center mb-10">
      <h2 className="text-xl font-bold text-center">Register A Accounts</h2>
      <p>Create your accounts for further </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-10"
      >
        {/* First Name Input */}
        <div className="flex flex-col gap-1 text-start">
          <label className="text-sm font-medium text-gray-700">Your Name</label>
          <input
            placeholder="Enter your first name"
            {...register("name", { required: true, maxLength: 20 })}
            className="border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
        </div>

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
            Enter Your Genter
          </label>
          <select
            {...register("gender")}
            className="border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-600"
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
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
        {/* Photo Input */}
        {/* Photo Input */}
        <div className="flex flex-col gap-1 text-start">
          <label className="text-sm font-medium text-gray-700">
            Your Photo
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: true })}
            className="border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-600 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-amber-600 file:text-white file:cursor-pointer"
          />
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

export default SignUpPage;
