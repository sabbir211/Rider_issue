"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const statusOptions = ["unsolved", "in_progress", "resolved", "decline"];

export default function IssueDetailsPage({ params }) {
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status2, setStatus2] = useState("unsolved");
const [specialStatus,setSpecialStatus]=useState("unsolved")
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `http://localhost:3000/api/getSingleIssue?id=${params.issueId}`,
          { cache: "no-cache" }
        );
        if (!res.ok) throw new Error("Failed to fetch issue data.");
        const data = await res.json();
        setIssue(data[0]); // assuming data is an array
        setSpecialStatus(data[0]?.status || "unsolved");
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [params.issueId]);

  const handleSubmit = async () => {
  try {
    setLoading(true)
    const res = await fetch(`http://localhost:3000/api/updateIssue`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issueId: params.issueId,
        status: status2,
        feedback: feedback,
      }),
    });

    if (!res.ok) throw new Error("Failed to update issue.");

    const data = await res.json();
    console.log("Update successful:", data);
    setSpecialStatus(status2);
  } catch (err) {
    console.error("Error updating issue:", err.message);
  }
  finally{
    setLoading(false)
  }
};


  if (loading)
    return <div className="p-6 text-gray-500">Loading issue details...</div>;
  if (error) return <div className="text-red-500 p-6">Error: {error}</div>;
  if (!issue) return <div className="text-gray-500 p-6">No issue found.</div>;

  const { Description, IssueId, ProblemType, RiderId, SubmittedAt } = issue;

  return (
    <div className="max-w-xl mx-auto p-6 shadow-md mt-3">
      <Card className="shadow-xl border border-gray-200 rounded-2xl p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Issue #{IssueId}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-rose-500 text-white px-3 py-1 rounded-md w-fit text-sm font-semibold">
            RIDER ID: {RiderId}
          </div>
          <div>
            <strong>Title:</strong>{" "}
            <span className="text-gray-700">{ProblemType}</span>
          </div>
          <div>
            <strong>Description:</strong>{" "}
            <span className="text-gray-700">{Description}</span>
          </div>
          <div>
            <strong>
              Status: <span className="bg-rose-500 text-white px-3 py-1 rounded-md w-fit text-sm font-semibold">{specialStatus} </span>
            </strong>
          </div>
          <div>
            <strong>Reported by:</strong>{" "}
            <span className="text-gray-500 italic">[Not available]</span>
          </div>
          <div>
            <strong>Created at:</strong>{" "}
            <span className="text-gray-600">
              {new Date(SubmittedAt).toLocaleString()}
            </span>
          </div>
          <div>
            <div className="border-gray-400 border-t-2 p-4 m-[-20px] mt-14">
              <h3 className="text-gray-500">
                Update the status or give feedback or do both
              </h3>
              <div className="mt-4">
                <div>
                  <div className="flex gap-2 mt-2 overflow-x-scroll my-4 ">
                    {statusOptions.map((s) => (
                      <Button
                        key={s}
                        variant={status2 === s ? "default" : "outline"}
                        className={cn(
                          "capitalize text-sm px-2 py-1 rounded-md", // smaller size
                          {
                            "bg-blue-600 text-white hover:bg-blue-700":
                              status2 === s,
                          }
                        )}
                        onClick={() => setStatus2(s)}
                      >
                        {s.replace("_", " ")}
                      </Button>
                    ))}
                  </div>
                </div>
                <strong>Feedback:</strong>
                <Textarea
                  placeholder="Enter your feedback here..."
                  className="mt-2"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <Button className="mt-4 w-full" onClick={handleSubmit}>
                Submit Status & Feedback
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
