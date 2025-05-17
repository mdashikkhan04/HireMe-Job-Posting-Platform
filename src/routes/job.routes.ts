import express from 'express';
import {
    createJob,
    getMyJobs,
    updateJob,
    deleteJob,
} from '../controllers/job.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('EMPLOYEE'), createJob);
router.get('/my-jobs', authenticate, authorizeRoles('EMPLOYEE'), getMyJobs);
router.put('/:id', authenticate, authorizeRoles('EMPLOYEE'), updateJob);
router.delete('/:id', authenticate, authorizeRoles('EMPLOYEE'), deleteJob);

export default router;
