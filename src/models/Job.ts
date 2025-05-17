import { Schema, model, Document, Types } from 'mongoose';

export interface IJob extends Document {
    title: string;
    description: string;
    postedBy: Types.ObjectId;
}

const jobSchema = new Schema<IJob>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

export const Job = model<IJob>('Job', jobSchema);
