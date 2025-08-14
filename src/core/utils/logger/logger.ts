type LogLevel = "info" | "error" | "warn" | "debug";

interface AppLog {
  level: LogLevel;
  message: string;
  labels: Record<string, string>;
  meta?: any;
  timestamp: string;
}

export class AppLogger {
  private queue: AppLog[] = [];
  private isSending = false;
  private readonly batchSize = 10;
  private readonly batchInterval = 3000;

  constructor() {
    if (process.env.NODE_ENV === "production") {
      setInterval(() => this.sendBatch(), this.batchInterval);
    }
  }

  log(level: LogLevel, message: string, labels: Record<string, string>, meta?: any) {
    const logEntry: AppLog = {
      level,
      message,
      labels,
      meta,
      timestamp: new Date().toISOString(),
    };

    if (process.env.NODE_ENV === "production") {
      this.queue.push(logEntry);
    } else {
      console[level]?.(message, meta);
    }
  }

  private async sendBatch() {
    if (this.isSending || this.queue.length === 0) return;

    this.isSending = true;

    const batch = this.queue.splice(0, this.batchSize);
    try {
      await fetch("http://localhost:3000/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batch),
      });
    } catch (error) {
      console.error("Failed to send logs:", error);
      this.queue.unshift(...batch); // Re-add logs to the queue if sending fails
    } finally {
      this.isSending = false;
    }
  }
}

export const appLogger = new AppLogger();
