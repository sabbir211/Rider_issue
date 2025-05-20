"use client";
import React, { useEffect, useState } from "react";

export default function IssueDetailsPage({ params }) {
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/getSingleIssue?id=${params.issueId}`,
          { cache: "no-cache" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch issue data.");
        }

        const data = await res.json();
        console.log("data:",data);
        
        setIssue(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading issue details...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-6">Error: {error}</div>;
  }

  if (!issue) {
    return <div className="text-gray-500 p-6">No issue found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Issue #{issue[0].IssueId}</h1>
      <div className="space-y-3 text-gray-800">
        <p><strong>Title:</strong> {issue[0].ProblemType}</p>
        <p><strong>Description:</strong> {issue[0].Description}</p>
        <p><strong>Status:</strong> {issue.status}</p>
        <p><strong>Reported by:</strong> {issue.problem_type}</p>
        <p><strong>Created at:</strong> {new Date(issue.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
}
