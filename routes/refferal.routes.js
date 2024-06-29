import express from 'express';
import { referrals, getReferrals } from '../controllers/referral.controller.js';

const router = express.Router();

/* Referral routes */
router.post('/new', referrals);
router.get('/getReferrals', getReferrals);

export default router