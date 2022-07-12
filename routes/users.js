import express from "express";

import Joi from "joi";
import asyncHandler from "express-async-handler"

import User from "../models/User.js";
import protect from "../middleware/protect.js";


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
            token:newUser.createJWT(newUser._id)
        })
        
    }


}))

// @desc    Login user & get token
// @route   POST /api/v1/users/login
// @access  Public
router.post("/login", asyncHandler(async (req, res) => {

    const schema = Joi.object({
        
        email: Joi.string().required().email(),
        password: Joi.string().required().min(13),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400)
        throw new Error("No such user, sign up first!")
    }

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: user.createJWT(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
}))

router.get("/profile", protect, async (req, res) => {
    const user = await User.findById(req.user);
    console.log(req.user);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email
        })
    } else {
        res.status(404)
        throw new Error("User not found!")
    }
})

export default router