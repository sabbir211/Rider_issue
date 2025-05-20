import { getDBConnection } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }

  try {
    const pool = await getDBConnection();

    const result = await pool
      .request()
      .input("user_id", user_id)
      .query("SELECT * FROM users WHERE user_id = @user_id");

    if (result.recordset.length > 0) {
      return res.status(409).json({ error: "User ID already exists" });
    }

    return res.status(200).json({ available: true });
  } catch (err) {
    console.error("Check user_id error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
