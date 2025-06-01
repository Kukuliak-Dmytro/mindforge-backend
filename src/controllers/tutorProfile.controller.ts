import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { BaseController } from './BaseController';
import { AuthRequest } from '../types/User';
import { supabaseAdmin } from '../clients/supabaseAdmin';

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

const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  education: z.object({
    add: z.array(tutorEducationSchema).optional(),
    remove: z.array(z.string().uuid()).optional()
  }).optional(),
  experience: z.object({
    add: z.array(tutorExperienceSchema).optional(),
    remove: z.array(z.string().uuid()).optional()
  }).optional(),
  subjects: z.object({
    add: z.array(tutorSubjectSchema).optional(),
    remove: z.array(z.object({
      subjectId: z.string().uuid(),
      categoryId: z.string().uuid()
    })).optional()
  }).optional()
});

class TutorProfileController extends BaseController {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  // Get tutor profile with all related data
  public getTutorProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      this.throwError('Unauthorized', 401);
    }

    const user = await this.prisma.user.findUnique({
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
      this.throwError('User not found', 404);
    }

    if (user.role !== 'TUTOR') {
      this.throwError('User is not a tutor', 403);
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
      education: user.education,
      experiences: user.experiences,
      subjects: user.subjects,
    }, 'Tutor profile retrieved successfully');
  };

  // Update tutor profile (consolidated endpoint)
  public updateTutorProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      this.throwError('Unauthorized', 401);
    }

    // Verify user is a tutor
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== 'TUTOR') {
      this.throwError('User is not a tutor', 403);
    }

    const validatedData = updateProfileSchema.parse(req.body);

    // Start a transaction to handle all updates
    const result = await this.prisma.$transaction(async (tx) => {
      // Update email, display name, and phone in Supabase Auth if provided
      if ((validatedData.email && validatedData.email !== user.email) || validatedData.firstName || validatedData.lastName || validatedData.phone) {
        const updatePayload: any = {};
        if (validatedData.email && validatedData.email !== user.email) {
          updatePayload.email = validatedData.email;
        }
        if (validatedData.phone && validatedData.phone !== user.phone) {
          updatePayload.phone = validatedData.phone;
        }
        // Always set user_metadata if any of these fields are present
        if (validatedData.firstName || validatedData.lastName || validatedData.phone) {
          const firstName = validatedData.firstName !== undefined ? validatedData.firstName : user.firstName || '';
          const lastName = validatedData.lastName !== undefined ? validatedData.lastName : user.lastName || '';
          const phone = validatedData.phone !== undefined ? validatedData.phone : user.phone || '';
          updatePayload.user_metadata = {
            display_name: `${firstName} ${lastName}`.trim(),
            phone,
          };
        }
        const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, updatePayload);
        if (error) {
          this.throwError('Failed to update user in Supabase Auth: ' + error.message, 400);
        }
      }
      // Update basic profile info if provided (excluding email, which is handled above)
      if (validatedData.firstName || validatedData.lastName || validatedData.bio || validatedData.avatarUrl) {
        await tx.user.update({
          where: { id: userId },
          data: {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            bio: validatedData.bio,
            avatarUrl: validatedData.avatarUrl
          },
        });
      }

      // Handle education updates
      if (validatedData.education) {
        if (validatedData.education.add?.length) {
          await tx.tutorEducation.createMany({
            data: validatedData.education.add.map(edu => ({
              userId,
              ...edu,
            })),
          });
        }
        if (validatedData.education.remove?.length) {
          await tx.tutorEducation.deleteMany({
            where: {
              id: { in: validatedData.education.remove },
              userId,
            },
          });
        }
      }

      // Handle experience updates
      if (validatedData.experience) {
        if (validatedData.experience.add?.length) {
          await tx.tutorExperience.createMany({
            data: validatedData.experience.add.map(exp => ({
              userId,
              ...exp,
            })),
          });
        }
        if (validatedData.experience.remove?.length) {
          await tx.tutorExperience.deleteMany({
            where: {
              id: { in: validatedData.experience.remove },
              userId,
            },
          });
        }
      }

      // Handle subject updates
      if (validatedData.subjects) {
        if (validatedData.subjects.add?.length) {
          // Verify all subjects and categories exist
          const [subjects, categories] = await Promise.all([
            tx.subject.findMany({
              where: { id: { in: validatedData.subjects.add.map(s => s.subjectId) } },
            }),
            tx.category.findMany({
              where: { id: { in: validatedData.subjects.add.map(s => s.categoryId) } },
            }),
          ]);

          if (subjects.length !== validatedData.subjects.add.length) {
            this.throwError('One or more subjects not found', 404);
          }
          if (categories.length !== validatedData.subjects.add.length) {
            this.throwError('One or more categories not found', 404);
          }

          await tx.tutorSubject.createMany({
            data: validatedData.subjects.add.map(subject => ({
              userId,
              ...subject,
            })),
          });
        }
        if (validatedData.subjects.remove?.length) {
          await tx.tutorSubject.deleteMany({
            where: {
              OR: validatedData.subjects.remove.map(subject => ({
                userId,
                subjectId: subject.subjectId,
                categoryId: subject.categoryId,
              })),
            },
          });
        }
      }

      // Return updated profile
      const updatedUser = await tx.user.findUnique({
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

      if (!updatedUser) {
        this.throwError('Failed to retrieve updated profile', 500);
      }

      return updatedUser;
    });

    this.sendSuccess(res, {
      user: {
        id: result.id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        avatarUrl: result.avatarUrl,
        bio: result.bio,
        phone: result.phone,
        updatedAt: result.updatedAt
      },
      education: result.education,
      experiences: result.experiences,
      subjects: result.subjects,
    }, 'Tutor profile updated successfully');
  };
}

export const tutorProfileController = new TutorProfileController();
