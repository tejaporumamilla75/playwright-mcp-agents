const winston = require("winston");
const path = require("path");
const fs = require("fs");

// Create logs directory inside src
const logDir = path.join(process.cwd(), "src", "logs");

// Ensure directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Log format
const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}] ${stack || message}`;
});

// Logger instance
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        logFormat
    ),
    transports: [
       // new winston.transports.Console(),

        new winston.transports.File({
            filename: path.join(logDir, "info.log"),
            level: "info",
        }),

        new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
        }),
    ],
    exitOnError: false,
});

module.exports = logger;