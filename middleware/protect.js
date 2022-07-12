import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new Error("You are NOT authorized to do that!");
    };

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.jwt_secret);
    console.log(payload);

    if (!payload) {
        throw new Error("Invalid credentials, you can't do that")
    }

    req.user = await User.findById(payload.id).select('-password')

    next()
});

export default protect