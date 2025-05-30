import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema for profile update
const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  bio: z.string().optional(),
  contactInfo: z.string().optional(),
});

// Get user profile (works for both students and tutors)
export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        // Include tutor-specific data if user is a tutor
        education: true,
        experiences: true,
        tutorSubjects: {
          include: {
            subject: true,
          },
        },
        // Include student-specific data if user is a student
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
          take: 5, // Get only 5 most recent orders
        },
        tutorOrders: {
          include: {
            subject: true,
            category: true,
            student: {
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
          take: 5, // Get only 5 most recent orders
        },
        // Include reviews
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
          take: 5, // Get only 5 most recent reviews
        },
        tutorReviews: {
          include: {
            student: {
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
          take: 5, // Get only 5 most recent reviews
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Calculate average rating for tutors
    let averageRating = null;
    if (user.role === 'TUTOR' && user.tutorReviews.length > 0) {
      const totalRating = user.tutorReviews.reduce((sum, review) => sum + review.rating, 0);
      averageRating = totalRating / user.tutorReviews.length;
    }

    // Format the response based on user role
    const response = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      role: user.role,
      bio: user.bio,
      phone: user.phone,
      contactInfo: user.contactInfo,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      // Role-specific data
      ...(user.role === 'TUTOR' && {
        education: user.education,
        experiences: user.experiences,
        tutorSubjects: user.tutorSubjects,
        tutorOrders: user.tutorOrders,
        tutorReviews: user.tutorReviews,
        averageRating,
      }),
      ...(user.role === 'STUDENT' && {
        studentOrders: user.studentOrders,
        studentReviews: user.studentReviews,
      }),
    };

    res.status(200).json({
      message: 'Profile retrieved successfully',
      data: response,
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update profile
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const validatedData = updateProfileSchema.parse(req.body);

    // Update user data with profile fields
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        bio: validatedData.bio,
        contactInfo: validatedData.contactInfo,
      },
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      data: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        contactInfo: updatedUser.contactInfo,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
      return;
    }
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 