import prisma from '../utils/prisma';

export class OrderService {
  // Create a new order
  async createOrder(
    data: {
      title: string;
      description?: string;
      subjectId: string;
      categoryId: string;
      tutorId?: string;
      totalPrice: number;
      sessionsCount?: number;
    },
    studentId: string
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

    return prisma.order.create({
      data: {
        ...data,
        sessionsCount,
        studentId,
        status: 'PENDING',
      },
    });
  }

  // Edit an order (only by student)
  async updateOrder(
    orderId: string,
    studentId: string,
    updates: Partial<{
      title: string;
      description: string;
      subjectId: string;
      categoryId: string;
      tutorId: string;
      totalPrice: number;
      sessionsCount: number;
      status: string;
    }>
  ) {
    return prisma.order.update({
      where: {
        id: orderId,
        studentId,
      },
      data: updates,
    });
  }

  // Delete an order (only by student)
  async deleteOrder(
    orderId: string,
    studentId: string
  ) {
    await prisma.order.delete({
      where: {
        id: orderId,
        studentId,
      },
    });
    return { success: true };
  }

  // Get all orders (optionally filtered by tutorId or studentId)
  async getOrders(
    filter?: { tutorId?: string; studentId?: string }
  ) {
    return prisma.order.findMany({
      where: {
        ...(filter?.tutorId ? { tutorId: filter.tutorId } : {}),
        ...(filter?.studentId ? { studentId: filter.studentId } : {}),
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
  async toggleSaveOrderForTutor(tutorId: string, orderId: string) {
    const existing = await prisma.savedOrder.findUnique({
      where: { tutorId_orderId: { tutorId, orderId } },
    });
    let saved;
    if (existing) {
      await prisma.savedOrder.delete({
        where: { tutorId_orderId: { tutorId, orderId } },
      });
      saved = false;
    } else {
      await prisma.savedOrder.create({
        data: { tutorId, orderId },
      });
      saved = true;
    }
    // Always return the updated list
    const savedOrders = await prisma.savedOrder.findMany({
      where: { tutorId },
      include: {
        order: {
          include: {
            student: true,
            subject: true,
            category: true,
          },
        },
      },
    });
    return { saved, savedOrders };
  }

  // Unsave an order as a tutor
  async unsaveOrderForTutor(tutorId: string, orderId: string) {
    return prisma.savedOrder.delete({
      where: { tutorId_orderId: { tutorId, orderId } },
    });
  }

  // Get saved orders for a tutor
  async getSavedOrdersForTutor(tutorId: string) {
    return prisma.savedOrder.findMany({
      where: { tutorId },
      include: {
        order: {
          include: {
            student: true,
            subject: true,
            category: true,
          },
        },
      },
    });
  }

  // Toggle save for a tutor as a student
  async toggleSaveTutorForStudent(studentId: string, tutorId: string) {
    const existing = await prisma.savedTutor.findUnique({
      where: { studentId_tutorId: { studentId, tutorId } },
    });
    if (existing) {
      await prisma.savedTutor.delete({
        where: { studentId_tutorId: { studentId, tutorId } },
      });
      return { saved: false };
    } else {
      await prisma.savedTutor.create({
        data: { studentId, tutorId },
      });
      return { saved: true };
    }
  }

  // Unsave a tutor as a student
  async unsaveTutorForStudent(studentId: string, tutorId: string) {
    return prisma.savedTutor.delete({
      where: { studentId_tutorId: { studentId, tutorId } },
    });
  }

  // Get saved tutors for a student
  async getSavedTutorsForStudent(studentId: string) {
    const savedTutors = await prisma.savedTutor.findMany({
      where: { studentId },
      include: {
        tutor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            bio: true,
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

    // Add average rating to each tutor
    const result = savedTutors.map(saved => {
      const tutor = saved.tutor as any;
      let rating = null;
      if (tutor && tutor.tutorReviews && tutor.tutorReviews.length > 0) {
        const sum = tutor.tutorReviews.reduce((acc: number, r: any) => acc + r.rating, 0);
        rating = sum / tutor.tutorReviews.length;
      }
      return {
        ...saved,
        tutor: {
          ...tutor,
          rating,
        },
      };
    });

    return result;
  }
} 