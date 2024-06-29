import mongoose from "mongoose";
import bcrypt from "bcrypt";

/* User schema */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin",
    },
    password: {
        type: String,
        required: true,
    },
    uniqueId: {
        type: String,
        unique: true,
    },
    referrals: {
        type: Number,
        default: 0,
    },
    /* verified: {
        type: Boolean,
        default: false,
    }, */
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

/* Generate unique uniqueId */
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ uniqueId: 1 }, { unique: true });

/* Hash password before saving */
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/* Compare password */
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

/* Create User model */
const User = mongoose.model("User", UserSchema);

export default User;
