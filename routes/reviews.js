import express from "express";
import asyncHandler from "express-async-handler"
import apicache from "apicache";

import protect from "../middleware/protect.js";
import Review from "../models/Review.js";

const router = express.Router();
let cache = apicache.middleware;

// @desc    Get all the reviews
// @route   GET /api/v1/reviews
// @access  Public
router.get("/", cache("60 minutes"), asyncHandler(async (req, res) => {
    const reviews = await Review.find();

    const reviewsAgg = await Review.aggregate([
        
        { $group: { _id: "$rating", count: { $sum: 1 } } },
    ]);

    console.log(reviewsAgg);

    res.status(200).json({ reviewsAgg: reviewsAgg, reviews: reviews });
}));

// @desc    Get one review
// @route   GET /api/v1/reviews/:id
// @access  Public
router.get("/:id", cache("60 minutes"), asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)

    res.status(200).json(review)
}));

// @desc    Add a new review
// @route   POST /api/v1/reviews
// @access  Private
router.post("/", protect, asyncHandler(async (req, res) => {
    if (req.user.isAdmin) {
        return new Error("Admin can NOT write reviews")
    }

    const { title, content } = req.body;

    if (!title||!content) {
        throw new Error("All those fields are required")
    }

    req.body.createdBy = req.user._id;

    const newReview = await Review.create(req.body)

    res.status(201).json(newReview)
}))

// @desc    update a review
// @route   PUT /api/v1/reviews/:id
// @access  Private
router.get(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
        const { title, rating, content } = req.body;

        if (!title || !content || !rating) {
            throw new Error("All those fields are required");
        }

        const review = await Review.findById(req.params.id);

        // check permission
        if (req.user._id === review.createdBy.toString()) {
            next();
        } else {
            throw new Error(
                "Not authorized to access this resource"
            );
        }

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,{new:true}
        );

        res.status(201).json(updatedReview);
    })
);

// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
router.delete(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {

        const review = await Review.findById(req.params.id);

        // check permission
        if (req.user._id === review.createdBy.toString() || req.user.isAdmin) {
            next();
        } else {
            throw new Error("Not authorized to access this resource");
        }

        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json("Review removed");
    })
);


export default router