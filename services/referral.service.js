import Referral from "../models/referral.model.js";
import User from "../models/user.model.js";
import { sendReferralEmail } from "../utils/referralEmail.js";

/* Referral service methods */
export const ReferralService = {
    referrals: async (userData) => {
        try {
            console.log('Processing referral with data:', userData);

            // Check if the referred email is already registered
            const existingUser = await User.findOne({ email: userData.referred_email }).maxTimeMS(30000);
            if (existingUser) {
                throw new Error("This email is already registered");
            }

            // Check if the referred email is already in the referrals
            const existingEmail = await Referral.findOne({ referred_email: userData.referred_email }).maxTimeMS(30000);
            if (existingEmail) {
                throw new Error("This email has already been referred");
            }

            // Save the referral
            const referral = new Referral({ ...userData });
            await referral.save();

            // Send referral email
            sendReferralEmail(userData.referrer, userData.referred_email, userData.referral_code);

            return { message: "Referral sent successfully" };
        } catch (error) {
            console.error("Error processing referral:", error);
            throw new Error(error.message || "Referral processing failed");
        }
    },

    getReferrals: async () => {
        try {
            console.log("Fetching referrals");

            const referrals = await Referral.aggregate([
                {
                    $group: {
                        _id: "$referrer_email", 
                        referrer: { $first: "$referrer" }, 
                        referrer_email: { $first: "$referrer_email" }, 
                        referrals: { $push: { referred_email: "$referred_email", referral_code: "$referral_code", createdAt: "$createdAt" } }, 
                        referral_count: { $sum: 1 } 
                    }
                },
                {
                    $project: {
                        _id: 0, 
                        referrer: 1, 
                        referrer_email: 1, 
                        referrals: 1, 
                        referral_count: 1 
                    }
                }
            ]);

            return referrals;
        } catch (error) {
            console.error("Error fetching referrals:", error);
            throw new Error(error.message || "Failed to fetch referrals");
        }
    },
};