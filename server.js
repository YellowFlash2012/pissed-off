import express from "express";
import colors from "colors"
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import path from "path";


import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js"
import reviewRoutes from "./routes/reviews.js"
import { errorHandler } from "./middleware/error.js";

config()
const app = express();
app.use(express.json())
app.use(helmet())

app.use(xss());
app.use(mongoSanitize());

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}


app.get("/", (req, res) => {
    res.send("We are live and running!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// config for deployment
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
}
// else {
//     app.get("/", (req, res) => {
//         res.send("API is running");
//     });
// }

app.use(errorHandler)

connectDB()
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${PORT}`.yellow.bold
    );
})