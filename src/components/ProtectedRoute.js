"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation"; // or "next/router" if you're in App Router
import { useEffect } from "react";
import auth from "../../firebase.init"; // adjust path as needed

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/logReg"); // redirect to login
    }
  }, [user, loading, router]);

  if (loading || !user) return null; // or show spinner

  return children;
}
