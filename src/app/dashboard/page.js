"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Loader } from "lucide-react";// Make sure columns is defined and imported
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [authorized, setAuthorized] = useState(false);
  const [issueData, setIssueData] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  // ✅ Always call hooks first
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);

        const res = await fetch(`/api/retrieve_all_issues?page=1`, {
          cache: "no-cache",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch issues");
        }

        const data = await res.json();
        setIssueData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoader(false);
      }
    };

    if (authorized) {
      fetchData();
    }
  }, [authorized]);

  
  // ✅ Now safely render based on state
  if (loading || loader || !authorized) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <Loader className="animate-spin mr-2" /> Loading...
      </div>
    );
  }
console.log(issueData);

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={issueData} />
      </div>
    </ProtectedRoute>
  );
}
