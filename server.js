import express from "express";
import colors from "colors"
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./config/db.js";


config()
const app = express();
app.use(express.json())
app.use(helmet())

app.get("/", (req, res) => {
    res.send("We are live and running!");
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}


connectDB()
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${PORT}`.yellow.bold
    );
})