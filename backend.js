import express from "express";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: "db",
  user: "appuser",
  password: "app123",
  database: "proxydb"
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username=? AND password=?",
      [username, password]
    );
    if (rows.length > 0) {
      res.json({ success: true, role: rows[0].role });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "DB Error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const role = req.headers["x-user-role"];
    if (role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin only" });
    }
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ success: false, message: "DB Error" });
  }
});

app.get("/status", (req, res) => {
  res.json({ message: "Backend running on port 5000" });
});

app.listen(5000, () => {
  console.log("Backend API running at http://localhost:5000");
});
