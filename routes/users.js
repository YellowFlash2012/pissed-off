import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import Joi from "joi";
import asyncHandler from "express-async-handler"

import User from "../models/User.js";

const router = express.Router();

// @desc    Sign up new user & get token
// @route   POST /api/users/
// @access  Public
router.post("/", asyncHandler(async (req, res) => {
    // Joi schema & validator
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(13),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400);
        throw new Error("A user with this email address already exists");
    }

    // let's create a new user
    const newUser = await User.create({
        name,email,password
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token:createJWT(newUser._id)
        })
        
    }


}))

export default router