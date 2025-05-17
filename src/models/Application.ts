import { Schema, model, Types, Document } from 'mongoose';

export interface IApplication extends Document {
    job: Types.ObjectId;
    user: Types.ObjectId;
    cvUrl: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    paymentStatus: 'PAID' | 'UNPAID';
    invoiceId?: Types.ObjectId;
}

const applicationSchema = new Schema<IApplication>({
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cvUrl: { type: String, required: true },
    status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
    paymentStatus: { type: String, enum: ['PAID', 'UNPAID'], default: 'UNPAID' },
    invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice' }
}, { timestamps: true });

export const Application = model<IApplication>('Application', applicationSchema);
