import express from "express";

import rateLimiter from "express-rate-limit";
import { deleteAUser, getAllUsers, getOneUser, getUserProfile, loginUser, logoutUser, registerNewUser, updateAUser, updateUserProfile } from "../../controllers/v1/users.js";
import protect from "../../middleware/protect.js";
import admin from "../../middleware/admin.js";

const router = express.Router();

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: "Too many requests from this IP address",
});


router.route("/").post(
    apiLimiter,
    registerNewUser
);


router.route("/login").post(
    apiLimiter,
    loginUser
);


router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);


router.route("/logout").post(protect, logoutUser)

// ***Admin zone only***

router.route("/").get(protect, admin, getAllUsers);

router.route("/:id").get(
    protect,
    admin,
    getOneUser
).put(protect, admin, updateAUser).delete(protect, admin, deleteAUser);

export default router;
