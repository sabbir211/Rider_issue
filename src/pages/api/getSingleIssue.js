import sql from 'mssql';
import { getDBConnection } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET allowed' });
  }
const issueId=req.query.id;

  try {
    console.log("Connecting to DB...");
    await getDBConnection();
    console.log("Connected!");

    const result = await sql.query`
      SELECT * FROM RiderIssues  WHERE IssueId=${issueId}
    `;

    console.log("Query successful:", result.recordset.length, "rows");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("SQL ERROR:", err); 
    res.status(500).json({ message: 'Error fetching issues', error: err.message });
  }
}
