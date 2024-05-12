import express from "express";

import protect from "../../middleware/protect.js";
import { addNewReview, deleteAReview, getAllReviews, getOneReview, updateAReview } from "../../controllers/v1/reviews.js";


const router = express.Router();

router.route("/").get(getAllReviews).post(protect, addNewReview);

router.route("/:id").get(getOneReview).put(protect, updateAReview).delete(protect, deleteAReview);

export default router