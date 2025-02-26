"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Key, User, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Registration({ updateLogRegState }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();


  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    router.push("/");
  };

  return (
    <div>
      <div className="py-5 px-2 md:px-8 my-10">
        <h1 className="text-2xl font-bold text-blue-900">Create new Account</h1>
        <div className="mx-auto my-2 w-12 bg-white border-2 border-blue-900 rounded-md"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-5 flex flex-col gap-10 mt-10 mb-2 ">
            <label className="input input-bordered flex items-center gap-2">
              <User className="text-gray-600" />
              <input
                type="number"
                className="grow focus:outline-none text-lg border-b-2 focus:border-red-400"
                placeholder="Rider ID"
                {...register("riderId")}
                required
              />
            </label>
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
                className="grow focus:outline-none text-lg border-b-2 focus:border-red-400"
                placeholder="Password"
                {...register("password")}
                required
              />
            </label>
          </div>
          <div className="my-5">
           <Button variant='outline'>REGISTER</Button>
          </div>
        </form>
        <div>
          <p className="text-left p-4">
            Already have an account?
            <u
              className="hover:cursor-pointer text-green-600 ps-2"
              onClick={() => updateLogRegState(true)}
            >
              LOGIN
            </u>
          </p>
        </div>
      </div>
    </div>
  );
}
