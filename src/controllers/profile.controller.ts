import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema for profile update
const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
});

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming you have user info in request from auth middleware

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const validatedData = updateProfileSchema.parse(req.body);

    // Update user data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
      },
    });

    // Update or create profile with phone number
    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: {
        phone: validatedData.phone,
      },
      create: {
        userId,
        phone: validatedData.phone,
      },
    });

    return res.status(200).json({
      message: 'Profile updated successfully',
      data: {
        user: {
          id: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
        },
        profile: {
          phone: updatedProfile.phone,
        },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
    }

    console.error('Error updating profile:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}; 