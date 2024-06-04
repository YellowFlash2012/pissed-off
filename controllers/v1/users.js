import Joi from "joi";
import asyncHandler from "express-async-handler";
import User from "../../models/v1/User.js";
import Review from "../../models/v1/Review.js";


// @desc    Sign up new user
// @route   POST /api/v1/users/
// @access  Public
export const registerNewUser = asyncHandler(async (req, res) => {
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
        name,
        email,
        password,
    });

    let token = newUser.createJWT(newUser._id);

    if (newUser) {
        res.status(201)
            .cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            .json({
                success: true,
                message: `Welcome aboard, ${newUser.name}`,
                data: {
                    
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    isAdmin:newUser.isAdmin
                
                },
            });
    }
});

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
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
        res.status(400);
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
                success: true,
                message:`Welcome back, ${user.name}`,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin:user.isAdmin
                }
            });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

// @desc    Get user profile details
// @route   GET /api/v1/users/profile
// @access  Private

export const getUserProfile = asyncHandler(async (req, res) => {
    // console.log(req.user);
    const user = await User.findById(req.user._id).select("-password");

    const reviews = await Review.find({ createdBy: user._id });

    if (user) {
        res.json({
            success: true,
            message: "User details successfully retrieved!",
            data:{user, reviews}
            
        });
    } else {
        res.status(404);
        throw new Error("User not found!");
    }
});

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new Error("All those fields are required!");
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
    });

    res.status(201).json({
        success: true,
        message: "Your profile was updated. Thanks",
        data:updatedUser,
    });
});

// @desc    logout user
// @route   POST /api/v1/users/logout
// @access  Private
export const logoutUser = (asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    res.clearCookie("jwt")

    res.status(200).json({
        success:true,
        message: `See you next time ${user.name}!`
    });
    })
)

// ***Admin zone only***
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private - Admin only
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().populate("reviews");

    const id = users.map(user => user._id);

    const numOfUserReviews = await Review.where({
        createdBy: id,
    });

    res.status(200).json({
        success: true,
        count: users.length,
        message: "Here are all the users registered on this platform",
        data: users,
    
    });
});

// @desc    Get one single user
// @route   GET /api/v1/users/:id
// @access  Private - Admin only

export const getOneUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    // console.log(user._id);

    const numOfUsersReviews = await Review.where({ createdBy: user._id });

    res.status(200).json({
        success: true,
        numOfUsersReviews: numOfUsersReviews.length,
        message: "Here is the requested user profile details",
        data: user,
    });
});

// @desc    Update a user
// @route   PUT /api/v1/users/:id
// @access  Private - Admin only
export const updateAUser = asyncHandler(async (req, res) => {
    const { name, email} = req.body;

    if (!name || !email) {
        throw new Error("All those fields are required!");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(201).json({
        success: true,
        message: "Profile successfully updated!",
        data:updatedUser
        
    });
});

// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private - Admin only
export const deleteAUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success:true,
        message: `User ${user.name} was deleted!`
    });
});