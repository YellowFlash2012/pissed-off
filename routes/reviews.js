import express from "express";
import asyncHandler from "express-async-handler"
import apicache from "apicache";
import uniqueRandomArray from 'unique-random-array';

import protect from "../middleware/protect.js";
import Review from "../models/Review.js";

const router = express.Router();
let cache = apicache.middleware;

// @desc    Get all the reviews
// @route   GET /api/v1/reviews
// @access  Public
router.get("/", cache("60 minutes"), asyncHandler(async (req, res) => {
    const reviews = await Review.find().limit(24)

    const upsetReviews = await Review.where({ rating: "upset" }).limit(12);

    const furiousReviews = await Review.where({ rating: "furious" }).limit(12);

    const rpoReviews = await Review.where({ rating: "really-pissed-off" }).limit(12);


    const reviewsAgg = await Review.aggregate([
        
        { $group: { _id: "$rating", count: { $sum: 1 } } },
    ]);

    

    res.status(200).json({
        reviewsAgg: reviewsAgg,
        data: {
            reviews: reviews,
            upsetReviews: upsetReviews,
            furiousReviews: furiousReviews,
            rpoReviews: rpoReviews,
        },
    });
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
    req.body.name = req.user.name;
    req.body.color = uniqueRandomArray([
        "#849712",
        "#3f0549",
        "#b419ac",
        "#e1f9fa",
        "#4afd86",
        "#afd446",
        "#56bcd4",
        "#6160ce",
        "#d9ba9a",
        "#d32029",
    ]);

    const newReview = await Review.create(req.body)

    res.status(201).json(newReview)
}))

// @desc    update a review
// @route   PUT /api/v1/reviews/:id
// @access  Private
router.put(
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