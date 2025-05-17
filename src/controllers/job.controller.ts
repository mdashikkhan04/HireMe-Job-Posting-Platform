import { Request, Response } from 'express';
import { Job } from '../models/Job';

export const createJob = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        if (req.user?.role !== 'EMPLOYEE') {
            res.status(403).json({ message: 'Only EMPLOYEE can create jobs' });
            return;
        }

        const job = new Job({ title, description, postedBy: req.user.id });
        await job.save();

        res.status(201).json({ message: 'Job created', job });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create job' });
    }
};

export const getMyJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await Job.find({ postedBy: req.user?.id });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

export const updateJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);

        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }

        if (job.postedBy.toString() !== req.user?.id) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }

        const { title, description } = req.body;
        job.title = title ?? job.title;
        job.description = description ?? job.description;

        await job.save();
        res.json({ message: 'Job updated', job });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update job' });
    }
};

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);

        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }

        if (job.postedBy.toString() !== req.user?.id) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }

        await job.deleteOne();
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
};
