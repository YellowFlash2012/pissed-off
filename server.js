import express from "express";
import colors from "colors"
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";


import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js"
import reviewRoutes from "./routes/reviews.js"

config()
const app = express();
app.use(express.json())
app.use(helmet())


const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}


app.get("/", (req, res) => {
    res.send("We are live and running!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);

connectDB()
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${PORT}`.yellow.bold
    );
})