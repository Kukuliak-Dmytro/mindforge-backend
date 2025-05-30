import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schemas
const tutorExperienceSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  title: z.string().min(1, 'Title is required'),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)).optional(),
});

const tutorEducationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  degree: z.string().min(1, 'Degree is required'),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)).optional(),
});

const tutorSubjectSchema = z.object({
  subjectId: z.string().uuid('Invalid subject ID'),
  categoryId: z.string().uuid('Invalid category ID'),
  price: z.number().positive('Price must be positive'),
});

// Update tutor profile
export const updateTutorProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Verify user is a tutor
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== 'TUTOR') {
      res.status(403).json({ message: 'User is not a tutor' });
      return;
    }

    res.status(200).json({
      message: 'Tutor profile updated successfully',
      data: { userId },
    });
  } catch (error) {
    console.error('Error updating tutor profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add tutor experience
export const addTutorExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Verify user is a tutor
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== 'TUTOR') {
      res.status(403).json({ message: 'User is not a tutor' });
      return;
    }

    const validatedData = tutorExperienceSchema.parse(req.body);

    const experience = await prisma.tutorExperience.create({
      data: {
        userId,
        ...validatedData,
      },
    });

    res.status(201).json({
      message: 'Experience added successfully',
      data: experience,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
      return;
    }
    console.error('Error adding experience:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete tutor experience
export const deleteTutorExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { experienceId } = req.params;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Verify the experience belongs to the tutor
    const experience = await prisma.tutorExperience.findFirst({
      where: {
        id: experienceId,
        userId,
      },
    });

    if (!experience) {
      res.status(404).json({ message: 'Experience not found' });
      return;
    }

    await prisma.tutorExperience.delete({
      where: { id: experienceId },
    });

    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add tutor education
export const addTutorEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Verify user is a tutor
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== 'TUTOR') {
      res.status(403).json({ message: 'User is not a tutor' });
      return;
    }

    const validatedData = tutorEducationSchema.parse(req.body);

    const education = await prisma.tutorEducation.create({
      data: {
        userId,
        ...validatedData,
      },
    });

    res.status(201).json({
      message: 'Education added successfully',
      data: education,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
      return;
    }
    console.error('Error adding education:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete tutor education
export const deleteTutorEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { educationId } = req.params;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Verify the education belongs to the tutor
    const education = await prisma.tutorEducation.findFirst({
      where: {
        id: educationId,
        userId,
      },
    });

    if (!education) {
      res.status(404).json({ message: 'Education not found' });
      return;
    }

    await prisma.tutorEducation.delete({
      where: { id: educationId },
    });

    res.status(200).json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add tutor subject
export const addTutorSubject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Verify user is a tutor
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== 'TUTOR') {
      res.status(403).json({ message: 'User is not a tutor' });
      return;
    }

    const validatedData = tutorSubjectSchema.parse(req.body);

    // Verify subject and category exist
    const [subject, category] = await Promise.all([
      prisma.subject.findUnique({
        where: { id: validatedData.subjectId },
      }),
      prisma.category.findUnique({
        where: { id: validatedData.categoryId },
      }),
    ]);

    if (!subject) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    const tutorSubject = await prisma.tutorSubject.create({
      data: {
        userId,
        subjectId: validatedData.subjectId,
        categoryId: validatedData.categoryId,
        price: validatedData.price,
      },
    });

    res.status(201).json({
      message: 'Subject added successfully',
      data: tutorSubject,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
      return;
    }
    console.error('Error adding subject:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete tutor subject
export const deleteTutorSubject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { subjectId, categoryId } = req.params;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Verify the subject belongs to the tutor
    const tutorSubject = await prisma.tutorSubject.findFirst({
      where: {
        userId,
        subjectId,
        categoryId,
      },
    });

    if (!tutorSubject) {
      res.status(404).json({ message: 'Subject not found for this tutor' });
      return;
    }

    await prisma.tutorSubject.delete({
      where: {
        userId_subjectId_categoryId: {
          userId,
          subjectId,
          categoryId,
        },
      },
    });

    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get tutor profile with all related data
export const getTutorProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        education: true,
        experiences: true,
        subjects: {
          include: {
            subject: true,
            category: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.role !== 'TUTOR') {
      res.status(403).json({ message: 'User is not a tutor' });
      return;
    }

    res.status(200).json({
      message: 'Tutor profile retrieved successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
          bio: user.bio,
          phone: user.phone,
          contactInfo: user.contactInfo,
        },
        education: user.education,
        experiences: user.experiences,
        subjects: user.subjects,
      },
    });
  } catch (error) {
    console.error('Error getting tutor profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 