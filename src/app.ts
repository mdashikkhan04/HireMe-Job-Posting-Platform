import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import jobRoutes from './routes/job.routes';
import applicationRoutes from './routes/application.routes';

dotenv.config();


const app = express();
app.use(express.json());

connectDB();

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => {
    res.send('HireMe API is running');
});

export default app;
