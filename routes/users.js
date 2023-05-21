import express from "express";

import Joi from "joi";
import asyncHandler from "express-async-handler"
import apicache from "apicache";

import User from "../models/User.js";
import protect from "../middleware/protect.js";
import admin from "../middleware/admin.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";

import rateLimiter from "express-rate-limit";


const router = express.Router();
let cache = apicache.middleware;
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: "Too many requests from this IP address",
});

// @desc    Sign up new user & get token
// @route   POST /api/users/
// @access  Public
router.post("/", apiLimiter, asyncHandler(async (req, res) => {
    // Joi schema & validator
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(13),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        
        // return res.status(400).send(error.details[0].message);
        res.status(400);
        throw new Error(error.details[0].message);
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400);

        throw new Error("A user with this email address already exists");
    }

    // let's create a new user
    const newUser = await User.create({
        name, email, password
    });
    
    let token = newUser.createJWT(newUser._id)

    if (newUser) {
        res.status(201)
        .cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge:30*24*60*60*1000
    })
            .json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            })
        
    }


}))

// @desc    Login user & get token
// @route   POST /api/v1/users/login
// @access  Public
router.post("/login", apiLimiter, asyncHandler(async (req, res) => {

    const schema = Joi.object({
        
        email: Joi.string().required().email(),
        password: Joi.string().required().min(13),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        // return res.status(400).send(error.details[0].message);

        res.status(400);
        throw new Error(error.details[0].message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400)
        throw new Error("No such user, sign up first!");
    }

    if (user && (await user.matchPassword(password))) {
        let token = user.createJWT(user._id);
        // console.log(token);
        res.status(200)
        .cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
        
    
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
}))

// @desc    Get user profile details
// @route   GET /api/v1/users/profile
// @access  Private
router.get("/profile", cache("60 minutes"), protect, async (req, res) => {
    // console.log(req.user);
    const user = await User.findById(req.user._id);
    
    const reviews = await Review.find({ createdBy: user._id });

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            reviews:reviews
        })
    } else {
        res.status(404)
        throw new Error("User not found!")
    }
})

// @desc    Update user profile
// @route   PUT /api/v1/users/:id
// @access  Private
router.put("/profile", protect, asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new Error("All those fields are required!");
    };

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });

    res.status(201).json({
        name: updatedUser.name,
        email: updatedUser.email,
        token: updatedUser.createJWT(updatedUser._id),
    });


}));

// @desc    logout user
// @route   POST /api/v1/users/logout
// @access  Private

router.post("/logout", asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires:new Date(0)
    })

    res.status(200).json({message:"See you next time!"})
}))


// ***Admin zone only***
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private - Admin only
router.get("/", protect, admin, asyncHandler(async (req, res) => {
    const users = await User.find();
    
    const numOfUsersReviews = await Review.where({ createdBy: req.params.id });
    
    res.status(200).json(users);
}))

// @desc    Get one single user
// @route   GET /api/v1/users/:id
// @access  Private - Admin only
router.get("/:id", protect, admin, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    // console.log(user._id);
    
    const numOfUsersReviews = await Review.where({ createdBy:user._id})
    
    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        numOfUsersReviews:numOfUsersReviews.length
    })
}));

// @desc    Update a user
// @route   PUT /api/v1/users/:id
// @access  Private - Admin only
router.get("/:id", protect, admin, asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new Error("All those fields are required!");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(201).json({
        name: updatedUser.name,
        email: updatedUser.email,
    });
}))
// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private - Admin only
router.get("/:id", protect, admin, asyncHandler(async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)

    res.status(200).json("User removed!")
}))



export default router