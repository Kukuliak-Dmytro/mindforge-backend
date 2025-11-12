import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { BaseController } from "./BaseController";
import { AuthRequest } from "../types/User";
import { OrderService } from "../services/order.service";

const prisma = new PrismaClient();
const orderService = new OrderService();

// Validation schemas
const tutorExperienceSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  title: z.string().min(1, "Title is required"),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
});

const tutorEducationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  degree: z.string().min(1, "Degree is required"),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
});

const tutorSubjectSchema = z.object({
  subjectId: z.string().uuid("Invalid subject ID"),
  categoryId: z.string().uuid("Invalid category ID"),
  price: z.number().positive("Price must be positive"),
});

const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  education: z
    .object({
      add: z.array(tutorEducationSchema).optional(),
      remove: z.array(z.string().uuid()).optional(),
    })
    .optional(),
  experience: z
    .object({
      add: z.array(tutorExperienceSchema).optional(),
      remove: z.array(z.string().uuid()).optional(),
    })
    .optional(),
  subjects: z
    .object({
      add: z.array(tutorSubjectSchema).optional(),
      remove: z
        .array(
          z.object({
            subjectId: z.string().uuid(),
            categoryId: z.string().uuid(),
          })
        )
        .optional(),
    })
    .optional(),
});

class TutorProfileController extends BaseController {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  // Get tutor profile with all related data
  public getTutorProfile = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      this.throwError("Unauthorized", 401);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        tutorProfile: true,
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
      this.throwError("User not found", 404);
    }

    if (user.role !== "TUTOR") {
      this.throwError("User is not a tutor", 403);
    }

    this.sendSuccess(
      res,
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
          bio: user.tutorProfile?.bio ?? null,
          phone: user.tutorProfile?.phone ?? null,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        },
        education: user.tutorProfile?.education ?? [],
        experiences: user.tutorProfile?.experiences ?? [],
        subjects: user.tutorProfile?.subjects ?? [],
      },
      "Tutor profile retrieved successfully"
    );
  };

  // Update tutor profile (consolidated endpoint)
  public updateTutorProfile = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      this.throwError("Unauthorized", 401);
    }

    // Verify user is a tutor
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== "TUTOR") {
      this.throwError("User is not a tutor", 403);
    }

    const validatedData = updateProfileSchema.parse(req.body);

    // Start a transaction to handle all updates
    const result = await this.prisma.$transaction(async (tx: any) => {
      // Update email in database if provided (Better Auth handles email updates)
      if (validatedData.email && validatedData.email !== user.email) {
        await tx.user.update({
          where: { id: userId },
          data: { email: validatedData.email },
        });
      }
      // Update basic user info if provided
      if (
        validatedData.firstName ||
        validatedData.lastName ||
        validatedData.avatarUrl
      ) {
        await tx.user.update({
          where: { id: userId },
          data: {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            avatarUrl: validatedData.avatarUrl,
          },
        });
      }

      // Update or create tutor profile if bio or phone provided
      if (validatedData.bio !== undefined || validatedData.phone !== undefined) {
        const existingProfile = await tx.tutorProfile.findUnique({
          where: { userId },
        });

        if (existingProfile) {
          await tx.tutorProfile.update({
            where: { userId },
            data: {
              bio: validatedData.bio,
              phone: validatedData.phone,
            },
          });
        } else {
          await tx.tutorProfile.create({
            data: {
              userId,
              bio: validatedData.bio,
              phone: validatedData.phone,
            },
          });
        }
      }

      // Ensure tutor profile exists (needed for education/experiences/subjects)
      let tutorProfile = await tx.tutorProfile.findUnique({
        where: { userId },
      });
      if (!tutorProfile) {
        tutorProfile = await tx.tutorProfile.create({
          data: { userId },
        });
      }
      const tutorProfileId = tutorProfile.id;

      // Handle education updates
      if (validatedData.education) {
        if (validatedData.education.add?.length) {
          await tx.tutorEducation.createMany({
            data: validatedData.education.add.map((edu) => ({
              tutorProfileId,
              ...edu,
            })),
          });
        }
        if (validatedData.education.remove?.length) {
          await tx.tutorEducation.deleteMany({
            where: {
              id: { in: validatedData.education.remove },
              tutorProfileId,
            },
          });
        }
      }

      // Handle experience updates
      if (validatedData.experience) {
        if (validatedData.experience.add?.length) {
          await tx.tutorExperience.createMany({
            data: validatedData.experience.add.map((exp) => ({
              tutorProfileId,
              ...exp,
            })),
          });
        }
        if (validatedData.experience.remove?.length) {
          await tx.tutorExperience.deleteMany({
            where: {
              id: { in: validatedData.experience.remove },
              tutorProfileId,
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
              where: {
                id: { in: validatedData.subjects.add.map((s) => s.subjectId) },
              },
            }),
            tx.category.findMany({
              where: {
                id: { in: validatedData.subjects.add.map((s) => s.categoryId) },
              },
            }),
          ]);

          if (subjects.length !== validatedData.subjects.add.length) {
            this.throwError("One or more subjects not found", 404);
          }
          if (categories.length !== validatedData.subjects.add.length) {
            this.throwError("One or more categories not found", 404);
          }

          await tx.tutorSubject.createMany({
            data: validatedData.subjects.add.map((subject) => ({
              tutorProfileId,
              ...subject,
            })),
          });
        }
        if (validatedData.subjects.remove?.length) {
          await tx.tutorSubject.deleteMany({
            where: {
              OR: validatedData.subjects.remove.map((subject) => ({
                tutorProfileId,
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
          tutorProfile: {
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
          },
        },
      });

      if (!updatedUser) {
        this.throwError("Failed to retrieve updated profile", 500);
      }

      return updatedUser;
    });

    this.sendSuccess(
      res,
      {
        user: {
          id: result.id,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          avatarUrl: result.avatarUrl,
          bio: result.tutorProfile?.bio ?? null,
          phone: result.tutorProfile?.phone ?? null,
          updatedAt: result.updatedAt,
        },
        education: result.tutorProfile?.education ?? [],
        experiences: result.tutorProfile?.experiences ?? [],
        subjects: result.tutorProfile?.subjects ?? [],
      },
      "Tutor profile updated successfully"
    );
  };

  // Toggle save an order as a tutor
  public toggleSaveOrder = async (req: AuthRequest, res: Response) => {
    if (!req.user || req.user.role !== "TUTOR")
      return this.throwError("Unauthorized", 401);
    const { orderId } = req.body;
    if (!orderId) return this.throwError("orderId is required", 400);
    const result = await orderService.toggleSaveOrderForTutor(
      req.user.id,
      orderId
    );
    this.sendSuccess(
      res,
      result,
      result.saved ? "Order saved" : "Order unsaved"
    );
  };

  // Get saved orders for a tutor
  public getSavedOrders = async (req: AuthRequest, res: Response) => {
    if (!req.user || req.user.role !== "TUTOR")
      return this.throwError("Unauthorized", 401);
    const savedOrders = await orderService.getSavedOrdersForTutor(req.user.id);
    this.sendSuccess(res, savedOrders, "Saved orders retrieved");
  };
}

export const tutorProfileController = new TutorProfileController();
