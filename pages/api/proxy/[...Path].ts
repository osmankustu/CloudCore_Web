// pages/api/proxy/[...path].ts

import { ServerResponse } from "http";
import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer({ secure: false });

proxy.on("proxyReq", (proxyReq, req) => {
  // Burada req NextApiRequest değil, http.IncomingMessage tipinde olur,
  // dilersen as NextApiRequest yazabilirsin:
  const request = req as NextApiRequest;
  const authHeader = request.headers["authorization"];
  if (authHeader) {
    proxyReq.setHeader("Authorization", authHeader);
  }
});

proxy.on("error", (err, req, res) => {
  // console.error("❌ Proxy Error:", err);

  // res Socket olabilir, headersSent olmayabilir, o yüzden kontrol et
  if (res && "headersSent" in res && !(res as ServerResponse).headersSent) {
    (res as ServerResponse).writeHead(500, { "Content-Type": "application/json" });
  }
  res?.end?.(JSON.stringify({ error: "Proxy error", details: err.message }));
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(resolve => {
    // ✅ backend URL'yi düzgün kur
    const targetUrl = `${process.env.API_URL}${req.url?.replace("/api/proxy", "")}`;

    //console.log("📡 Gönderilen Backend URL:", targetUrl);
    // console.log('Request-Type: ',req.headers['content-type'])
    // console.log("_________________________________________________________________________________________")

    proxy.web(req, res, {
      target: targetUrl,
      changeOrigin: true,
      ignorePath: true, // URL'yi biz verdik, Next.js'in path'ini kullanma
    });

    proxy.once("proxyRes", () => resolve());
  });
}
