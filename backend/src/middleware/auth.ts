import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import jwt from 'jsonwebtoken';
import { config } from '../config';

// Extend the Request interface to include the user property
export interface AuthenticatedRequest extends Request {
  user?: any;
}

// Middleware for client authentication using Clerk
export const requireAuth = ClerkExpressRequireAuth();

// Middleware for admin authentication using JWT
export const requireAdminAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};