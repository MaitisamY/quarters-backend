import express from 'express';
import { referrals } from '../controllers/referral.controller.js';

const router = express.Router();

router.post('/referrals', referrals);

export default router