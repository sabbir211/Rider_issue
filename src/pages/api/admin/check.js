import { verifyFirebaseToken } from "@/lib/firebaseAdmin";
import { getDBConnection } from "@/lib/db";

export default async function handler(req, res) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split("Bearer ")[1];
// const authHeader = req.headers.authorization || "";
// console.log("Auth Header:", authHeader);

  if (!token) return res.status(401).json({ error: "Missing token" });

  const decoded = await verifyFirebaseToken(token);

  if (!decoded) return res.status(401).json({ error: "Invalid token" });

  const firebase_uid = decoded.uid;

  const pool = await getDBConnection();
  const result = await pool.request()
    .input("firebase_uid", firebase_uid)
    .query("SELECT role FROM users WHERE firebase_uid = @firebase_uid");

  const role = result.recordset[0]?.role;

  if (role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  return res.status(200).json({ message: "You are an admin!" });
}
