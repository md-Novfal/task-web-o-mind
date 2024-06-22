require("winston-daily-rotate-file");
var winston = require("winston");

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.align(),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}:${info.message}`
    )
);

winston.loggers.add("logger", {
    transports: [
        new winston.transports.Console({
            colorize: true,
        }),
        new winston.transports.DailyRotateFile({
            name: "logger",
            filename: "./task",
            prepend: true,
            datePattern: "YYYY/MM/DD",
            format: logFormat,
            extension: ".txt",
        }),
    ],
});
var logger = winston.loggers.get("logger");
Object.defineProperty(exports, "LOG", { value: logger });