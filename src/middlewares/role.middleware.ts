import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(403).json({ message: 'Forbidden: No user info' });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({ message: 'Forbidden: Access denied' });
            return;
        }

        next();
    };
};

