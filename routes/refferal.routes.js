import express from 'express';
import { referrals, getReferrals } from '../controllers/referral.controller.js';

const router = express.Router();

router.post('/referrals', referrals);
router.get('/getReferrals', getReferrals);

export default router