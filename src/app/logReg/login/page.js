"use client";

import React, { useState } from "react";
import { Facebook, Github, Google, Key, Mail, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../../firebase.init";

export default function Login({ updateLogRegState }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginUser(email, password) {
    setLoading(true);
    setErrorMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        throw new Error("Email not verified! Please check your inbox.");
      }

      console.log("User logged in:", user);
      router.push("/"); // Redirect after successful login
    } catch (error) {
      const errorMessages = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-email": "Invalid email format.",
        "auth/user-disabled": "This account has been disabled.",
      };
      setErrorMessage(errorMessages[error.code] || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data, event) => {
    event.preventDefault();
    await loginUser(data.email, data.password);
  };

  return (
    <div>
      <div className="py-5 px-2 md:px-8 my-10">
        <h1 className="text-2xl font-bold text-blue-900">Sign in to Account</h1>
        <div className="mx-auto my-2 w-12 bg-white border-2 border-blue-900 rounded-md"></div>

        {errorMessage && (
          <p className="text-red-600 font-semibold text-center mb-4">{errorMessage}</p>
        )}

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
                className="grow focus:outline-none text-lg border-b-2 focus:border-red-400"
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
            <Button variant="outline" type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <Loader className="animate-spin mr-2" /> Logging in...
                </span>
              ) : (
                "LOGIN"
              )}
            </Button>
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
