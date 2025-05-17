import { Request, Response } from 'express';
import { Application } from '../models/Application';

export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const applications = await Application.find()
            .populate('user', 'name email role')
            .populate('job', 'title')
            .populate('invoiceId');

        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['ACCEPTED', 'REJECTED'].includes(status)) {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }

        const application = await Application.findById(id);
        if (!application) {
            res.status(404).json({ message: 'Application not found' });
            return;
        }

        application.status = status as any;
        await application.save();

        res.json({ message: `Application ${status.toLowerCase()}`, application });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update application' });
    }
};
