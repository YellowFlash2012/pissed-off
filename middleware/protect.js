import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.jwt_secret);
            // console.log(decoded);

            req.user = await User.findById(decoded.id).select("-password");

            next()
        } catch (error) {
            res.status(401);

            throw new Error("Your token is invalid!");
        }
    } else {
        res.status(401);

        throw new Error("You are NOT authorized to do that!");
    }

    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith("Bearer")) {
    //     throw new Error("You are NOT authorized to do that!");
    // };

    // token = authHeader.split(" ")[1];

    // const payload = jwt.verify(token, process.env.jwt_secret);

    // if (!payload) {
    //     throw new Error("Invalid credentials, you can't do that")
    // }

    // req.user = await User.findById(payload.id).select('-password');

    // next()
});

export default protect