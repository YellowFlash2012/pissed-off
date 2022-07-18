
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
        color: {
            type: String,

            enum: [
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
            ],
            default: "849712",
        },
        content: {
            type: String,
            required: [true, "Please enter a detailed review"],

            minlength: 20,
        },

        name: {
            type: String,
            required: [true, "Please enter reviewer's full name"],
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
