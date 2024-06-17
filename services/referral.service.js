import Referral from "../models/referral.model.js";
import { sendReferralEmail } from "../utils/referralEmail.js";

export const ReferralService = {
  referrals: async (userData) => {
    try {
      console.log('Processing referral with data:', userData);

      const existingEmail = await Referral.findOne({ referred_email: userData.referred_email }).maxTimeMS(30000); // Increased timeout
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
};