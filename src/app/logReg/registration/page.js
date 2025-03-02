"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Key, User, Mail, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { sendEmailVerification } from "firebase/auth";
import auth from "../../../../firebase.init.js";

export default function Registration({ updateLogRegState }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Firebase hook for user registration
  const [createUserWithEmailAndPassword, user, loadingAuth, errorAuth] =
    useCreateUserWithEmailAndPassword(auth);
  const [currentUser] = useAuthState(auth);

  const [rider, setRider] = useState({});

  const storeUser = async (email, userId, role = "rider") => {
    try {
      const response = await fetch("/api/storeUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, user_id: userId, role }),
      });

      if (!response.ok) throw new Error("Failed to store user");
      console.log("User stored successfully!");
    } catch (error) {
      console.error("Error storing user:", error);
    }
  };

  // ✅ Check email verification & store user
  useEffect(() => {
    const checkAndStoreUser = async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload(); // Reload user to get the latest status
        if (auth.currentUser.emailVerified) {
          storeUser(rider.email, rider.rider_id, rider.role);
          clearInterval(interval); // Stop checking once verified
          router.refresh(); // Reload the app
          router.push("/"); // Redirect to the home page
        }
      }
    };
  
    const interval = setInterval(() => {
      checkAndStoreUser();
    }, 3000); // Check every 3 seconds
  
    return () => clearInterval(interval); // Cleanup when component unmounts
  }, [currentUser, rider, router]);
  

  // Register user & send verification email
  const registerUser = async (riderId, email, password) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      // if (!userCredential?.user) throw new Error("User creation failed");

      // const actionCodeSettings = {
      //   url: `http://localhost:3000/`,
      //   handleCodeInApp: true,
      // };

      // await sendEmailVerification(userCredential.user, actionCodeSettings);
      await sendEmailVerification(userCredential.user);
      setErrorMsg("Verification email sent! Please check your inbox.");
    } catch (error) {
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Invalid email format.",
        "auth/weak-password": "Password should be at least 6 characters.",
        "auth/missing-password": "Password is required.",
      };
      setErrorMsg(
        errorMessages[error.code] || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data, event) => {
    event.preventDefault();

    setRider({ rider_id: data.riderId, email: data.email, role: "rider" });
    registerUser(data.riderId, data.email, data.password);
  };

  return (
    <div>
      <div className="py-5 px-2 md:px-8 my-10">
        <h1 className="text-2xl font-bold text-blue-900">Create new Account</h1>
        <div className="mx-auto my-2 w-12 bg-white border-2 border-blue-900 rounded-md"></div>

        {errorMsg && (
          <p className="text-red-600 font-semibold text-center mb-4">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-5 flex flex-col gap-10 mt-10 mb-2">
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
            <Button
              variant="outline"
              type="submit"
              disabled={loading || loadingAuth}
            >
              {loading || loadingAuth ? (
                <span className="flex items-center">
                  <Loader className="animate-spin mr-2" /> Processing...
                </span>
              ) : (
                "REGISTER"
              )}
            </Button>
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
