import { z } from 'zod';

export const jobSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
});
