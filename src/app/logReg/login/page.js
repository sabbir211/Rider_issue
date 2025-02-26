"use client";

import React from "react";
import { Facebook, Github, Google, Key, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Login({updateLogRegState}) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log("User Data:", data);
    router.push("/"); // Redirect to home page
  };

  return (
    <div>
      <div className="py-5 px-2 md:px-8 my-10">
        <h1 className="text-2xl font-bold text-blue-900">Sign in to Account</h1>
        <div className="mx-auto my-2 w-12 bg-white border-2 border-blue-900 rounded-md"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-5 flex flex-col gap-6 mt-10 mb-2">
            <label className="input input-bordered flex items-center gap-2">
              <Mail className="text-gray-600" />
              <input
                type="text"
                className="grow focus:outline-none text-lg border-b-2 focus:border-red-400"
                placeholder="Email"
                {...register("email")}
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <Key className="text-gray-600" />
              <input
                type="password"
                className="grow focus:outline-none  text-lg border-b-2 focus:border-red-400"
                placeholder="Password"
                {...register("password")}
                required
              />
            </label>
          </div>
          <div className="px-2">
            <div className="flex items-center justify-between py-6">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mx-3">Remember me</span>
                  <input
                    type="checkbox"
                    disabled
                    defaultChecked
                    className="checkbox rounded-sm w-4 h-4"
                  />
                </label>
              </div>
              <div>Forgot Password?</div>
            </div>
          </div>
          <div className="my-5">
            <Button variant="outline">REGISTER</Button>
          </div>
          <div>
            <p className="text-left p-4">
              Don't have an account?
              <u
                className="hover:cursor-pointer text-green-600 ps-2"
                onClick={() => updateLogRegState(false)}
              >
                Register
              </u>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
