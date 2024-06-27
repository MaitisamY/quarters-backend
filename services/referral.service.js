import { getReferrals } from "../controllers/referral.controller.js";
import Referral from "../models/referral.model.js";
import { sendReferralEmail } from "../utils/referralEmail.js";

export const ReferralService = {
  referrals: async (userData) => {
    try {
      console.log('Processing referral with data:', userData);

      const existingEmail = await Referral.findOne({ referred_email: userData.referred_email }).maxTimeMS(30000);
      if (existingEmail) {
        throw new Error("This email has already been referred");
      }

      const referral = new Referral({ ...userData });
      await referral.save();

      sendReferralEmail(userData.referrer, userData.referred_email, userData.referral_code);

      return { message: "Referral sent successfully" };
    } catch (error) {
      console.error("Error processing referral:", error);
      throw new Error("Referral processing failed");
    }
  },

  getReferrals: async () => {
    try {
      console.log("Fetching referrals");
      const referrals = await Referral.find();
      return referrals;
    } catch (error) {
      console.error("Error fetching referrals:", error);
      throw new Error("Failed to fetch referrals");
    }
  },
};