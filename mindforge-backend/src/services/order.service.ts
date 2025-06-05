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
} 