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

  const checkUserIdAvailability = async (riderId) => {
    try {
      const res = await fetch(
        `/api/checkUserExist?user_id=${encodeURIComponent(riderId)}`
      );
      if (res.status === 409) {
        return false; // Rider ID already exists
      }
      return true; // Rider ID is available
    } catch (err) {
      console.error("Error checking rider ID:", err);
      return false;
    }
  };

  const storeUser = async (email, userId, role = "rider", firebase_uid) => {
    try {
      const response = await fetch("/api/storeUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, user_id: userId, role, firebase_uid }),
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
        await auth.currentUser.reload();

        if (auth.currentUser.emailVerified) {
          const firebase_uid = user?.user?.uid; // ✅ fix here

          storeUser(rider.email, rider.rider_id, rider.role, firebase_uid);

          clearInterval(interval); // stop polling
          router.refresh();
          router.push("/");
        }
      }
    };

    const interval = setInterval(checkAndStoreUser, 3000);

    return () => clearInterval(interval);
  }, [user, rider, router]);

  // Register user & send verification email
  const registerUser = async (riderId, email, password) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
     
      await sendEmailVerification(userCredential.user);
      setErrorMsg("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.log(error);

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
setLoading(true);
    const isAvailable = await checkUserIdAvailability(data.riderId);
    setLoading(false);
    if (!isAvailable) {
      setErrorMsg(" Rider ID already exists. Please choose another.");
      return;
    }
    if(Number(data.riderId)<10000 || Number(data.riderId)>99999){
      setErrorMsg("Rider ID needs to be exactly 5 digit");
      return;
    }
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
