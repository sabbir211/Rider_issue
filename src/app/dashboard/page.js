"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) return;

      const token = await user.getIdToken();


      const res = await fetch("/api/admin/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setAuthorized(true);
      } else {
        router.push("/unauthorized");
      }
    };

    if (!loading) {
      checkAccess();
    }
  }, [user, loading, router]);

  if (!authorized) return <div>Checking access...</div>;

  return <div>Welcome Admin</div>;
}
