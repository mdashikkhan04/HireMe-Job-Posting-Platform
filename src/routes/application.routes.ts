import express from 'express';
import {
    createPaymentIntent,
    confirmApplication,
    getMyApplications
} from '../controllers/application.controller';

import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { uploadCV } from '../middlewares/upload.middleware';

const router = express.Router();

// Create Stripe Payment Intent
router.post(
    '/create-payment-intent',
    authenticate,
    authorizeRoles('JOB_SEEKER'),
    createPaymentIntent
);

// Confirm Application after payment success
router.post(
    '/confirm-application',
    authenticate,
    authorizeRoles('JOB_SEEKER'),
    uploadCV.single('cv'),
    confirmApplication
);

router.get(
    '/my-applications',
    authenticate,
    authorizeRoles('JOB_SEEKER'),
    getMyApplications
);

export default router;

