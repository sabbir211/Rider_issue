import sql from 'mssql';
import { getDBConnection } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET allowed' });
  }

  const { RiderId, page = 1 } = req.query;

  if (!RiderId) {
    return res.status(400).json({ message: 'Missing RiderId in query' });
  }

  const pageSize = 10;
  const pageNumber = parseInt(page);
  const offset = (pageNumber - 1) * pageSize;

  try {
    console.log("Connecting to DB...");
    await getDBConnection();
    console.log("Connected!");

    console.log("Fetching issues for RiderId:", RiderId);

    const result = await sql.query`
      SELECT * FROM (
        SELECT 
          IssueId,
          RiderId,
          ProblemType AS problem_type,
          Description,
          status AS Status,
          FORMAT(SubmittedAt, 'hh:mm tt dd-MMM-yyyy') AS SubmittedAt,
          ROW_NUMBER() OVER (ORDER BY SubmittedAt DESC) AS RowNum
        FROM RiderIssues
        WHERE RiderId = ${RiderId}
      ) AS Paginated
      WHERE RowNum BETWEEN ${offset + 1} AND ${offset + pageSize}
    `;

    console.log("Query successful:", result.recordset.length, "rows");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("SQL ERROR:", err); 
    res.status(500).json({ message: 'Error fetching issues', error: err.message });
  }
}
