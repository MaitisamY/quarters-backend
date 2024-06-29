import { ReferralService } from "../services/referral.service.js";

export const referrals = async (req, res) => {
    try {
        const response = await ReferralService.referrals(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getReferrals = async (req, res) => {
    try {
        const referrals = await ReferralService.getReferrals();
        res.status(200).json(referrals); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};