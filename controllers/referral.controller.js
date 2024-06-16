import { ReferralService } from "../services/referral.service.js";

export const referrals = async (req, res) => {
  try {
    const response = await ReferralService.referrals(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
