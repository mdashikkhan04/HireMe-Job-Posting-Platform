import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerSchema, loginSchema } from '../validations/auth.validation';
import { validateWithZod } from '../middlewares/validate.middleware';

const router = express.Router();

// Register with Zod validation
router.post('/register', validateWithZod(registerSchema), register);

// Login with Zod validation
router.post('/login', validateWithZod(loginSchema), login);

export default router;
