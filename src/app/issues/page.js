"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useUser } from "../userContext";
import { Loader } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Issues() {
  const { userData, loading } = useUser();
  const [issueData, setIssueData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function fetchData() {
      if (!userData?.db?.user_id) return;
      setLoader(true);
      const res = await fetch(
        `http://localhost:3000/api/retrieve_issues?RiderId=${userData.db.user_id}&page=1`,
        {
          cache: "no-cache",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await res.json();
      setIssueData(data);
      setLoader(false);
    }
    fetchData();
  }, [userData]);

  if (loading || loader) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <Loader className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={issueData} />
      </div>
    </ProtectedRoute>
  );
}
