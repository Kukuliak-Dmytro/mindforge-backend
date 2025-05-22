import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    // First try to verify the token using Supabase's JWT secret
    const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET;
    if (!supabaseJwtSecret) {
      console.error('SUPABASE_JWT_SECRET is not set');
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }

    try {
      // Verify the token using Supabase's JWT secret
      const decoded = jwt.verify(token, supabaseJwtSecret) as {
        sub: string; // Supabase uses 'sub' for user ID
        email: string;
      };

      req.user = {
        id: decoded.sub,
        email: decoded.email,
      };
      
      next();
      return;
    } catch (jwtError) {
      // If JWT verification fails, try using Supabase client as fallback
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
      );

      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }

      req.user = {
        id: user.id,
        email: user.email!,
      };
      
      next();
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
}; 