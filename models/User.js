import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Please enter your full name"] },
        email: {
            type: String,
            required: [true, "Please enter a valid email address"],
            validate: {
                validator: validator.isEmail,
                message: "Please provide a valid email address",
            },
            unique: true,
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: validator.isStrongPassword,
                message: "Your password must have at least 1 special character, 1 uppercase letter, 1 lowercase letter, 1 number",
            },
            minlength: 13,
            
        },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

// ***comparing the pw for the login route
userSchema.methods.matchPaswword = async function (enteredPw) {
    return await bcrypt.compare(enteredPw, this.password);
};

// ***hashing the pw for the signup route
userSchema.pre("save",async function (next) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

// ***creating the jwt token
userSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id }, process.env.jwt_secret, { expiresIn: "9d" });
};

const User = mongoose.model("user", userSchema);

export default User