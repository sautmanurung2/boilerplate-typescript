import fs from "node:fs";
import path from "node:path";
import { Client } from "@elastic/elasticsearch";
import winston, { type Logger as WinstonLogger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { elasticConfig } from "../infrastructure/config/config";

const { combine, timestamp, json, printf } = winston.format;

export class Logger {
  private _logger: WinstonLogger;
  private elasticSearch: Client;

  constructor() {
    this._logger = this.setup();
    this.elasticSearch = new Client({
      node: elasticConfig.host || "http://localhostganteng:9200/",
      auth: {
        username: elasticConfig.username || "lebah_ganteng",
        password: elasticConfig.password || "jangan_kepo_brow",
      },
    });
  }

  async info(
    message: string,
    duration: number,
    process_name: string | null = null,
    process_type: string | null = null,
    payload: any | null = null,
    response: any | null = null,
  ): Promise<void> {
    const logEntry = { level: "info", message, duration, process_name, process_type, payload, response };
    this._logger.info(logEntry);
    await this.sendToElasticSearch(logEntry);
  }

  async error(
    message: string,
    duration: number,
    process_name: string | null = null,
    process_type: string | null = null,
    payload: any | null = null,
    response: any | null = null,
  ): Promise<void> {
    const logEntry = { level: "error", message, duration, process_name, process_type, payload, response };
    this._logger.error(logEntry);
    await this.sendToElasticSearch(logEntry);
  }

  private async sendToElasticSearch(logEntry: Record<string, any>): Promise<void> {
    try {
      await this.elasticSearch.index({
        index: "apa_aja_log",
        type: "_doc",
        body: { ...logEntry, timestamp: new Date().toISOString() },
      });
    } catch (error) {
      console.error("Error sending log to ElasticSearch:", error);
    }
  }

  private setup(): WinstonLogger {
    // Define log directory
    const LOG_DIR = "./logs";

    const logFormat = printf(
      ({ timestamp, level, message, duration, process_name, process_type, payload, response }) => {
        return JSON.stringify({
          timestamp,
          level,
          message,
          duration: duration !== undefined ? duration : null,
          process_name: process_name || null,
          process_type: process_type || null,
          payload: payload || null,
          response: response || null,
        });
      },
    );

    // Ensure the log directory exists
    if (!fs.existsSync(LOG_DIR)) {
      try {
        fs.mkdirSync(LOG_DIR, { recursive: true }); // Create directory if it doesn't exist
        console.log(`Log directory created at: ${LOG_DIR}`);
      } catch (err) {
        console.error("Error creating log directory:", err);
        process.exit(1); // Exit the application if the directory creation fails
      }
    }

    // Create a daily rotate file transport
    const dailyRotateFileTransport = new DailyRotateFile({
      filename: path.join(LOG_DIR, "c2o-logs-%DATE%.log"),
      datePattern: "DD-MM-YYYY",
      maxSize: "100mb",
      maxFiles: "28d", // Keep logs for 28 days
      level: "info", // Set the log level
      format: combine(
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS A",
        }),
        logFormat,
      ),
    });

    return winston.createLogger({
      format: combine(
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS A",
        }),
        json(),
      ),
      transports: [dailyRotateFileTransport],
    });
  }
}
