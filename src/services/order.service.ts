import prisma from '../utils/prisma';

export class OrderService {
  // Helper: Get tutor profile ID from user ID
  private async getTutorProfileId(tutorUserId: string): Promise<string | null> {
    const profile = await prisma.tutorProfile.findUnique({
      where: { userId: tutorUserId },
      select: { id: true },
    });
    return profile?.id ?? null;
  }

  // Helper: Get student profile ID from user ID
  private async getStudentProfileId(studentUserId: string): Promise<string | null> {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: studentUserId },
      select: { id: true },
    });
    return profile?.id ?? null;
  }

  // Create a new order
  // studentId is student userId, will be converted to studentProfileId
  async createOrder(
    data: {
      title: string;
      description?: string;
      subjectId: string;
      categoryId: string;
      tutorId?: string; // This is tutor userId, will be converted to tutorProfileId
      totalPrice: number;
      sessionsCount?: number;
    },
    studentUserId: string
  ) {
    // Fetch the category to check if it's recurring
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { isRecurring: true },
    });
    if (!category) throw new Error('Category not found');

    let sessionsCount = data.sessionsCount;
    if (!category.isRecurring) {
      sessionsCount = 1;
    } else {
      if (!sessionsCount || sessionsCount < 1) {
        throw new Error('sessionsCount must be provided and > 0 for recurring categories');
      }
    }

    // Convert student userId to studentProfileId
    const studentProfileId = await this.getStudentProfileId(studentUserId);
    if (!studentProfileId) throw new Error('Student profile not found');

    // Convert tutor userId to tutorProfileId if provided
    let tutorProfileId: string | undefined = undefined;
    if (data.tutorId) {
      const profileId = await this.getTutorProfileId(data.tutorId);
      if (!profileId) throw new Error('Tutor profile not found');
      tutorProfileId = profileId;
    }

    return prisma.order.create({
      data: {
        title: data.title,
        description: data.description,
        subjectId: data.subjectId,
        categoryId: data.categoryId,
        tutorProfileId,
        totalPrice: data.totalPrice,
        sessionsCount,
        studentProfileId,
        status: 'PENDING',
      },
    });
  }

  // Edit an order (only by student)
  // studentId is student userId, will be converted to studentProfileId
  async updateOrder(
    orderId: string,
    studentUserId: string,
    updates: Partial<{
      title: string;
      description: string;
      subjectId: string;
      categoryId: string;
      tutorId: string; // This is tutor userId, will be converted to tutorProfileId
      totalPrice: number;
      sessionsCount: number;
      status: string;
    }>
  ) {
    // Convert student userId to studentProfileId
    const studentProfileId = await this.getStudentProfileId(studentUserId);
    if (!studentProfileId) throw new Error('Student profile not found');

    // Convert tutorId to tutorProfileId if provided
    const updateData: any = { ...updates };
    if (updates.tutorId !== undefined) {
      if (updates.tutorId) {
        const profileId = await this.getTutorProfileId(updates.tutorId);
        if (!profileId) throw new Error('Tutor profile not found');
        updateData.tutorProfileId = profileId;
      } else {
        updateData.tutorProfileId = null;
      }
      delete updateData.tutorId;
    }

    return prisma.order.update({
      where: {
        id: orderId,
        studentProfileId,
      },
      data: updateData,
    });
  }

  // Delete an order (only by student)
  // studentId is student userId, will be converted to studentProfileId
  async deleteOrder(
    orderId: string,
    studentUserId: string
  ) {
    const studentProfileId = await this.getStudentProfileId(studentUserId);
    if (!studentProfileId) throw new Error('Student profile not found');
    
    await prisma.order.delete({
      where: {
        id: orderId,
        studentProfileId,
      },
    });
    return { success: true };
  }

  // Get all orders (optionally filtered by tutorId or studentId)
  // tutorId and studentId are user IDs, will be converted to profile IDs
  async getOrders(
    filter?: { tutorId?: string; studentId?: string }
  ) {
    let tutorProfileId: string | undefined = undefined;
    if (filter?.tutorId) {
      const profileId = await this.getTutorProfileId(filter.tutorId);
      if (profileId) tutorProfileId = profileId;
    }

    let studentProfileId: string | undefined = undefined;
    if (filter?.studentId) {
      const profileId = await this.getStudentProfileId(filter.studentId);
      if (profileId) studentProfileId = profileId;
    }

    return prisma.order.findMany({
      where: {
        ...(tutorProfileId ? { tutorProfileId } : {}),
        ...(studentProfileId ? { studentProfileId } : {}),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            isRecurring: true,
          },
        },
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // Get a single order by ID
  async getOrderById(orderId: string) {
    return prisma.order.findUnique({
      where: { id: orderId },
    });
  }

  // Toggle save for an order as a tutor and return all saved orders
  // tutorId is tutor userId, will be converted to tutorProfileId
  async toggleSaveOrderForTutor(tutorUserId: string, orderId: string) {
    const tutorProfileId = await this.getTutorProfileId(tutorUserId);
    if (!tutorProfileId) throw new Error('Tutor profile not found');

    const existing = await prisma.savedOrder.findUnique({
      where: { tutorProfileId_orderId: { tutorProfileId, orderId } },
    });
    let saved;
    if (existing) {
      await prisma.savedOrder.delete({
        where: { tutorProfileId_orderId: { tutorProfileId, orderId } },
      });
      saved = false;
    } else {
      await prisma.savedOrder.create({
        data: { tutorProfileId, orderId },
      });
      saved = true;
    }
    // Always return the updated list
    const savedOrders = await prisma.savedOrder.findMany({
      where: { tutorProfileId },
      include: {
        order: {
          include: {
            studentProfile: {
              include: {
                user: true,
              },
            },
            subject: true,
            category: true,
          },
        },
      },
    });
    return { saved, savedOrders };
  }

  // Unsave an order as a tutor
  async unsaveOrderForTutor(tutorUserId: string, orderId: string) {
    const tutorProfileId = await this.getTutorProfileId(tutorUserId);
    if (!tutorProfileId) throw new Error('Tutor profile not found');
    return prisma.savedOrder.delete({
      where: { tutorProfileId_orderId: { tutorProfileId, orderId } },
    });
  }

  // Get saved orders for a tutor
  async getSavedOrdersForTutor(tutorUserId: string) {
    const tutorProfileId = await this.getTutorProfileId(tutorUserId);
    if (!tutorProfileId) throw new Error('Tutor profile not found');
    return prisma.savedOrder.findMany({
      where: { tutorProfileId },
      include: {
        order: {
          include: {
            studentProfile: {
              include: {
                user: true,
              },
            },
            subject: true,
            category: true,
          },
        },
      },
    });
  }

  // Toggle save for a tutor as a student
  // studentId and tutorId are user IDs, will be converted to profile IDs
  async toggleSaveTutorForStudent(studentUserId: string, tutorUserId: string) {
    const studentProfileId = await this.getStudentProfileId(studentUserId);
    if (!studentProfileId) throw new Error('Student profile not found');
    
    const tutorProfileId = await this.getTutorProfileId(tutorUserId);
    if (!tutorProfileId) throw new Error('Tutor profile not found');

    const existing = await prisma.savedTutor.findUnique({
      where: { studentProfileId_tutorProfileId: { studentProfileId, tutorProfileId } },
    });
    if (existing) {
      await prisma.savedTutor.delete({
        where: { studentProfileId_tutorProfileId: { studentProfileId, tutorProfileId } },
      });
      return { saved: false };
    } else {
      await prisma.savedTutor.create({
        data: { studentProfileId, tutorProfileId },
      });
      return { saved: true };
    }
  }

  // Unsave a tutor as a student
  async unsaveTutorForStudent(studentUserId: string, tutorUserId: string) {
    const studentProfileId = await this.getStudentProfileId(studentUserId);
    if (!studentProfileId) throw new Error('Student profile not found');
    
    const tutorProfileId = await this.getTutorProfileId(tutorUserId);
    if (!tutorProfileId) throw new Error('Tutor profile not found');
    
    return prisma.savedTutor.delete({
      where: { studentProfileId_tutorProfileId: { studentProfileId, tutorProfileId } },
    });
  }

  // Get saved tutors for a student
  async getSavedTutorsForStudent(studentUserId: string) {
    const studentProfileId = await this.getStudentProfileId(studentUserId);
    if (!studentProfileId) throw new Error('Student profile not found');

    const savedTutors = await prisma.savedTutor.findMany({
      where: { studentProfileId },
      include: {
        tutorProfile: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
            education: true,
            experiences: true,
            subjects: {
              include: {
                subject: true,
                category: true,
              },
            },
            tutorReviews: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
    });

    // Add average rating to each tutor and format response
    const result = savedTutors.map(saved => {
      const tutorProfile = saved.tutorProfile;
      const tutor = tutorProfile.user;
      let rating = null;
      if (tutorProfile.tutorReviews && tutorProfile.tutorReviews.length > 0) {
        const sum = tutorProfile.tutorReviews.reduce((acc: number, r: any) => acc + r.rating, 0);
        rating = sum / tutorProfile.tutorReviews.length;
      }
      return {
        ...saved,
        tutor: {
          ...tutor,
          bio: tutorProfile.bio,
          rating,
          education: tutorProfile.education,
          experiences: tutorProfile.experiences,
          subjects: tutorProfile.subjects,
        },
      };
    });

    return result;
  }
} 