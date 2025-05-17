import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, company } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, role, company });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: '2d',
        });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
};
