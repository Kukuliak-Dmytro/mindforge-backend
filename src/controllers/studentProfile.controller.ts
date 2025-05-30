import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { BaseController } from './BaseController';
import { AuthRequest } from '../types/User';

const prisma = new PrismaClient();

// Validation schema for profile update
const updateProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  bio: z.string().optional()
});

class StudentProfileController extends BaseController {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  // Get student profile
  public getStudentProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      this.throwError('Unauthorized', 401);
    }
    
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        // Include student-specific data
        studentOrders: {
          include: {
            subject: true,
            category: true,
            tutor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
        studentReviews: {
          include: {
            tutor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
      },
    });

    if (!user) {
      this.throwError('User not found', 404);
    }

    if (user.role !== 'STUDENT') {
      this.throwError('User is not a student', 403);
    }

    this.sendSuccess(res, {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        phone: user.phone,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
      },
      studentOrders: user.studentOrders,
      studentReviews: user.studentReviews,
    }, 'Student profile retrieved successfully');
  };

  // Update student profile
  public updateStudentProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      this.throwError('Unauthorized', 401);
    }

    // Verify user is a student
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== 'STUDENT') {
      this.throwError('User is not a student', 403);
    }

    const validatedData = updateProfileSchema.parse(req.body);

    // Update user data with profile fields
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        bio: validatedData.bio
      }
    });

    this.sendSuccess(res, {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      updatedAt: updatedUser.updatedAt
    }, 'Student profile updated successfully');
  };
}

export const studentProfileController = new StudentProfileController();