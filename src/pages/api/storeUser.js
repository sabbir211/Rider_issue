import { getDBConnection } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, user_id, role } = req.body;

    // ✅ Validate input
    if (!email || !user_id) {
      return res.status(400).json({ error: "Email and User ID are required" });
    }

    const pool = await getDBConnection();

    // ✅ Check if User already exists
    const checkResult = await pool
      .request()
      .input("email", email)
      .query("SELECT * FROM users WHERE email = @email");

    if (checkResult.recordset.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // ✅ Insert User into database
    await pool
      .request()
      .input("user_id", user_id)
      .input("email", email)
      .input("role", role || "rider") // Default role: 'rider'
      .query("INSERT INTO users (user_id, email, role) VALUES (@user_id, @email, @role)");

    res.status(201).json({ success: true, message: "User stored successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
