import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

interface JwtPayload {
    id: string;
    role: 'ADMIN' | 'EMPLOYEE' | 'JOB_SEEKER';
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
