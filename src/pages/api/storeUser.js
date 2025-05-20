import { getDBConnection } from "@/lib/db";
import { verifyFirebaseToken } from "@/lib/firebaseAdmin"; // ✅ Use helper instead

export default async function handler(req, res) {
  const pool = await getDBConnection();

  switch (req.method) {
    case "POST":
      try {
        const { email, user_id, role, firebase_uid } = req.body;

        if (!email || !user_id || !firebase_uid) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const checkResult = await pool
          .request()
          .input("email", email)
          .query("SELECT * FROM users WHERE email = @email");

        if (checkResult.recordset.length > 0) {
          return res.status(409).json({ error: "User already exists" });
        }

        await pool
          .request()
          .input("user_id", user_id)
          .input("email", email)
          .input("role", role || "rider")
          .input("firebase_uid", firebase_uid)
          .query(
            "INSERT INTO users (user_id, email, role, firebase_uid) VALUES (@user_id, @email, @role, @firebase_uid)"
          );

        return res.status(201).json({ success: true });
      } catch (error) {
        console.error("POST error:", error);
        return res.status(500).json({ error: error.message });
      }

    case "GET":
      try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.replace("Bearer ", "");
        // console.log("🔐 Incoming token:", token);

        if (!token) {
          return res.status(401).json({ error: "No token provided" });
        }

        // ✅ Use helper to verify Firebase token
        const decodedToken = await verifyFirebaseToken(token);

        if (!decodedToken) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const firebase_uid = decodedToken.uid;

        const result = await pool
          .request()
          .input("firebase_uid", firebase_uid)
          .query("SELECT * FROM users WHERE firebase_uid = @firebase_uid");

        if (result.recordset.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(result.recordset[0]);
      } catch (error) {
        console.error("GET error:", error);
        return res
          .status(500)
          .json({ error: "Server error", details: error.message });
      }

    default:
      return res.status(405).json({ error: "Method Not Allowed" });
  }
}
