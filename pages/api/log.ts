import { count } from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import winston, { transports } from "winston";
import LokiTransport from "winston-loki";

const logger = winston.createLogger({
  transports: [
    new LokiTransport({
      host: "http://192.168.1.21:3100",
      json: true,
      interval: 2,
      labels: { app: "cloudcore-next-client" },
    }),
  ],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const logs = req.body;

  if (!Array.isArray(logs)) return res.status(400).json({ message: "Expected array of logs" });

  logs.forEach(({ level, message, labels = {}, meta, timestamp }) => {
    logger.log(level, message, {
      ...meta,
      timestamp,
      labels: { ...labels, env: process.env.NODE_ENV },
    });
  });

  res.status(200).json({ status: "ok", count: logs.length });
}
