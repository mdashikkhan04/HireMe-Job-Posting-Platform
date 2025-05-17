import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import {
    getAllApplications,
    updateApplicationStatus
} from '../controllers/admin.controller';

const router = express.Router();

router.get('/applications', authenticate, authorizeRoles('ADMIN'), getAllApplications);

router.patch('/applications/:id/status', authenticate, authorizeRoles('ADMIN'), updateApplicationStatus);

export default router;
