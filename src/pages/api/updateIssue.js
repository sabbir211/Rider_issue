import sql from 'mssql';
import { getDBConnection } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { issueId, status, feedback } = req.body;

  if (!issueId || !status) {
    return res.status(400).json({ message: "issueId and status are required." });
  }

  const finalFeedback = feedback?.trim() ? feedback : "No FeedBack";

  try {
    const pool = await getDBConnection();

    await pool.request()
      .input("issueId", sql.Int, issueId)
      .input("status", sql.NVarChar(50), status)
      .input("feedback", sql.NVarChar(sql.MAX), finalFeedback)
      .query(`
        UPDATE RiderIssues
        SET status = @status, feedback = @feedback
        WHERE issueId = @issueId
      `);

    res.status(200).json({ message: "Issue updated successfully." });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
}
