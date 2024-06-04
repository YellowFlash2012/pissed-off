import asyncHandler from "express-async-handler";
import uniqueRandomArray from "unique-random-array";
import Review from "../../models/v1/Review.js";


// @desc    Get all the reviews
// @route   GET /api/v1/reviews
// @access  Public
export const getAllReviews = asyncHandler(async (req, res) => {
    // pagination config
    const pageSize = 99;
    const page = Number(req.query.pageNumber) || 1;

    // search config
    const keyword = req.query.keyword
        ? { title: { $regex: req.query.keyword, $options: "i" } }
        : {};

    const count = await Review.countDocuments({ ...keyword });

    // console.log(keyword);

    const reviews = await Review.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    
    

    const upsetReviews = await Review.where({ rating: "upset" }).limit(12);

    const furiousReviews = await Review.where({ rating: "furious" }).limit(12);

    const rpoReviews = await Review.where({
        rating: "really-pissed-off",
    }).limit(12);

    const reviewsAgg = await Review.aggregate([
        { $group: { _id: "$rating", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
        success: true,
        count: reviews.length,
        message: "Here are all the reviews",
        reviewsAgg: reviewsAgg,
        data: {
            reviews,
            upsetReviews,
            furiousReviews,
            rpoReviews,
            page,
            pages: Math.ceil(count / pageSize),
        },
    });
});

// @desc    Get one review
// @route   GET /api/v1/reviews/:id
// @access  Public
export const getOneReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (review) {
        res.status(200).json({
            success: true,
            message: "Here is the requested review",
            data: review,
        });
    } else {
        res.status(404)
        throw new Error("Review NOT found!")
    }

});

// @desc    Add a new review
// @route   POST /api/v1/reviews
// @access  Private
export const addNewReview = asyncHandler(async (req, res) => {
    if (req.user.isAdmin) {
        return new Error("Admin can NOT write reviews");
    }

    const { title, content } = req.body;

    if (!title || !content) {
        throw new Error("All those fields are required");
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

    const newReview = await Review.create(req.body);

    res.status(201).json({
        success: true,
        message:"Your review was successfully posted!",
        data:newReview
    });
});

// @desc    update a review
// @route   PUT /api/v1/reviews/:id
// @access  Private
export const updateAReview = asyncHandler(async (req, res) => {
    const { title, rating, content } = req.body;

    if (!title || !content || !rating) {
        throw new Error("All those fields are required");
    }

    const review = await Review.findById(req.params.id);

    // check permission
    if (req.user._id === review.createdBy.toString()) {
        next();
    } else {
        throw new Error("Not authorized to access this resource");
    }

    const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(201).json({
        success: true,
        message:"Your review has been updated!",
        data:updatedReview
    });
});

// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
export const deleteAReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    // check permission
    if (req.user._id === review.createdBy.toString() || req.user.isAdmin) {
        next();
    } else {
        throw new Error("Not authorized to access this resource");
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"Review removed"});
});