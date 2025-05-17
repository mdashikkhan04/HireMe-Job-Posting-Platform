import { Schema, model, Types, Document } from 'mongoose';

export interface IInvoice extends Document {
    user: Types.ObjectId;
    amount: number;
    createdAt: Date;
}

const invoiceSchema = new Schema<IInvoice>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Invoice = model<IInvoice>('Invoice', invoiceSchema);
