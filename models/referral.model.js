import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({
    referrer: {
        type: String,
        required: true,
    },
    referrer_email: {
        type: String,
        required: true,
    },
    referred_email: {
        type: String,
        required: true,
        unique: true,
    },
    referral_code: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Referral = mongoose.model("Referral", ReferralSchema);

export default Referral;
