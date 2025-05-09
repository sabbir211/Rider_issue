
import sql from 'mssql';

import { getDBConnection } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { RiderId, problem_type, description } = req.body;

  try {
    await getDBConnection();
    
    await sql.query`
      INSERT INTO RiderIssues (RiderId, ProblemType, Description,status)
      VALUES (${RiderId}, ${problem_type}, ${description},${'unsolved'})
    `;

    res.status(200).json({ message: 'Issue stored successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error storing issue' });
  }
}
