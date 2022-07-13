import express from "express";
import { readFile } from "fs/promises";

import { config } from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import User from "./models/User.js";
import connectDB from "./config/db.js";
import Review from "./models/Review.js";


config();

// mongoose connection script
const PORT = process.env.PORT || 5000;
connectDB();

const importData = asyncHandler(async () => {
    // step 1: clearing the db
    await Review.deleteMany();

    // step 2: insert the users and set #1 user as admin
    const reviews = JSON.parse(await readFile(new URL("./data/reviews_mock_data.json", import.meta.url)));

    await Review.insertMany(reviews);

    console.log("success");
});

importData();
