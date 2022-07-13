
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter the review title"],
            minlength: 10,
        },

        rating: {
            type: String,
            required: [true, "Please choose a rating"],

            enum: ["upset", "furious", "really-pissed-off"],
            default: "upset",
        },
        content: {
            type: String,
            required: [true, "Please enter a detailed review"],

            minlength: 20,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);


const Review = mongoose.model("review", reviewSchema);

export default Review;
