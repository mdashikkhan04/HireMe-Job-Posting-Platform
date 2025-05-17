import { z } from 'zod';

export const paymentIntentSchema = z.object({
    amount: z.number().min(1),
});

export const confirmApplicationSchema = z.object({
    jobId: z.string().min(10),
    paymentIntentId: z.string().min(5),
});
