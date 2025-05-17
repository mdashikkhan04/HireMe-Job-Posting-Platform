import { Request, Response } from 'express';
import { Application } from '../models/Application';
import { Invoice } from '../models/Invoice';
import stripe from '../utils/stripe.service';

// Create Stripe Payment Intent
export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            res.status(400).json({ message: 'Amount is required' });
            return;
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'bdt',
            automatic_payment_methods: { enabled: true },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: 'Payment intent creation failed' });
    }
};

// Confirm Application after successful Stripe payment
export const confirmApplication = async (req: Request, res: Response) => {
    try {
        const { jobId, paymentIntentId } = req.body;
        const cvPath = req.file?.path;

        if (!jobId || !paymentIntentId || !cvPath) {
            res.status(400).json({ message: 'Job ID, CV and PaymentIntent ID are required' });
            return;
        }

        // Check if payment was successful
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            res.status(400).json({ message: 'Payment not successful' });
            return;
        }

        // Check duplicate application
        const exists = await Application.findOne({ job: jobId, user: req.user?.id });
        if (exists) {
            res.status(409).json({ message: 'You have already applied for this job' });
            return;
        }

        // Create invoice
        const invoice = await Invoice.create({
            user: req.user?.id,
            amount: paymentIntent.amount,
        });

        // Save application
        const application = await Application.create({
            job: jobId,
            user: req.user?.id,
            cvUrl: cvPath,
            paymentStatus: 'PAID',
            invoiceId: invoice._id,
            status: 'PENDING',
        });

        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (err) {
        res.status(500).json({ error: 'Application submission failed' });
    }
};

// Get Own Applications
export const getMyApplications = async (req: Request, res: Response) => {
    try {
        const applications = await Application.find({ user: req.user?.id })
            .populate('job')
            .populate('invoiceId');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};
