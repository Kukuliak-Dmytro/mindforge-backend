import { Request, Response, NextFunction } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../auth';
import { AuthRequest, User } from '../types/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: {
        user: User;
        session: {
          id: string;
          userId: string;
          expiresAt: Date;
        };
      };
    }
  }
}

/**
 * Better Auth middleware - requires authentication
 * Checks for valid session and attaches user to request
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(401).json({ message: 'Unauthorized - No valid session' });
      return;
    }

    // Attach session and user to request
    // Ensure role is included from the user object
    req.session = session;
    req.user = {
      ...session.user,
      role: (session.user as any).role || 'STUDENT', // Fallback to STUDENT if role not present
    } as User;
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

/**
 * Legacy JWT-based authentication (kept for backward compatibility)
 * Consider migrating to Better Auth's authenticateToken
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Redirect to Better Auth middleware
  return authenticateToken(req, res, next);
};

