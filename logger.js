import { createLogger, format, transports } from "winston";

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: "warn",
            filename: "logswarnings.log",
        }),
        new transports.File({
            level: "error",
            filename: "logsErrors.log",
        }),
        // new transports.MongoDB({
        // db:process.env.MONGO_URI,
        // collection:'logs
        // })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.metadata(),
        format.prettyPrint()
    ),
});

export default logger