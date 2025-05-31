import { Request, Response, NextFunction } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import { AuthRequest, User } from '../types/User';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
      supabaseRoleClient?: SupabaseClient;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as User;

    (req as AuthRequest).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

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

      // Create a role-based client for RLS
      const supabaseRoleClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
          },
          global: {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        }
      );

      req.user = {
        id: decoded.sub,
        email: decoded.email,
      };
      
      // Attach the role-based client to the request
      req.supabaseRoleClient = supabaseRoleClient;
      
      next();
      return;
    } catch (jwtError) {
      // If JWT verification fails, try using Supabase client as fallback
      const supabaseRoleClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
          },
          global: {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        }
      );

      const { data: { user }, error } = await supabaseRoleClient.auth.getUser(token);

      if (error || !user) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }

      req.user = {
        id: user.id,
        email: user.email!,
      };
      
      // Attach the role-based client to the request
      req.supabaseRoleClient = supabaseRoleClient;
      
      next();
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
}; 