import { Schema, model, Document } from 'mongoose';

export type Role = 'ADMIN' | 'EMPLOYEE' | 'JOB_SEEKER';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    company?: string;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['ADMIN', 'EMPLOYEE', 'JOB_SEEKER'],
            default: 'JOB_SEEKER',
        },
        company: { type: String },
    },
    { timestamps: true }
);

const User = model<IUser>('User', userSchema);
export default User;
