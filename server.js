import express from "express";
import colors from "colors"
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import path from "path";
import expresswinston from "express-winston"
import { format, transports } from "winston";


import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js"
import reviewRoutes from "./routes/reviews.js"
import { errorHandler } from "./middleware/error.js";
import logger from "./logger.js";

config()
const app = express();
app.use(express.json())
app.use(helmet())

app.use(xss());
app.use(mongoSanitize());

// express logging with winston
app.use(expresswinston.logger({
    winstonInstance:logger,
    statusLevels:true
}))

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}


// app.get("/", (req, res) => {
//     res.send("We are live and running!");
// });

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// config for deployment
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("We are live and running!");
    });
}

app.use(errorHandler)

const myFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} ${level}: ${meta.message}`
})

app.use(expresswinston.errorLogger({
    transports: [
        new transports.File({
            filename:'logsInternalErrors.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        myFormat
    )
}))

connectDB()
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${PORT}`.yellow.bold
    );
})