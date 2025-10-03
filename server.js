import express from "express";
import session from "express-session";
import { reverseProxy } from "./middleware/reverseProxy.js";

const app = express();
app.use(express.json());

app.use(session({
  secret: "proxy-secret",
  resave: false,
  saveUninitialized: true
}));

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    req.session.user = { username, role: "admin" };
    res.json({ success: true, message: "Login success (admin)" });
  } else if (username === "user" && password === "1111") {
    req.session.user = { username, role: "user" };
    res.json({ success: true, message: "Login success (user)" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
});

app.use("/api", reverseProxy());

app.listen(3000, () => {
  console.log("Proxy server running at http://localhost:3000");
});
