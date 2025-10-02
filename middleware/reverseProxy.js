import { createProxyMiddleware } from "http-proxy-middleware";

export function reverseProxy() {
  return createProxyMiddleware({
    target: "http://backend:5000",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },

    onProxyReq(proxyReq, req, res) {
      if (!req.session?.user && req.url !== "/login") {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "กรุณาเข้าสู่ระบบ" }));
        return;
      }

      proxyReq.setHeader("x-gateway", "express-proxy-example");
      if (req.session?.user?.role) {
        proxyReq.setHeader("x-user-role", req.session.user.role);
      }
    },

    onError(err, req, res) {
      console.error("Proxy Error:", err.message);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "ระบบขัดข้อง กรุณาลองใหม่ภายหลัง" }));
    }
  });
}
