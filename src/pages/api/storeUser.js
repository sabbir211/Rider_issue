import { getDBConnection } from "@/lib/db";

export default async function handler(req, res) {
  const pool = await getDBConnection();

  switch (req.method) {
    case "POST":
      try {
        const { email, user_id, role } = req.body;

        if (!email || !user_id) {
          return res.status(400).json({ error: "Email and User ID are required" });
        }

        // Check if user already exists
        const checkResult = await pool
          .request()
          .input("email", email)
          .query("SELECT * FROM users WHERE email = @email");

        if (checkResult.recordset.length > 0) {
          return res.status(409).json({ error: "User already exists" });
        }

        // Insert new user
        await pool
          .request()
          .input("user_id", user_id)
          .input("email", email)
          .input("role", role || "rider")
          .query(
            "INSERT INTO users (user_id, email, role) VALUES (@user_id, @email, @role)"
          );

        return res.status(201).json({ success: true, message: "User stored successfully!" });
      } catch (error) {
        console.error("POST error:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
      }

    case "GET":
      try {
        const { email } = req.query;

        if (!email) {
          return res.status(400).json({ error: "Email is required in query" });
        }

        const result = await pool
          .request()
          .input("email", email)
          .query("SELECT * FROM users WHERE email = @email");

        if (result.recordset.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(result.recordset[0]);
      } catch (error) {
        console.error("GET error:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
      }

    default:
      return res.status(405).json({ error: "Method Not Allowed" });
  }
}
