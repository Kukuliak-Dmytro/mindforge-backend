import prisma from '../utils/prisma';

export class InviteService {
  // Create a new invite
  async createInvite(data: {
    orderId: string;
    tutorId: string;
    studentId: string;
    senderRole: 'STUDENT' | 'TUTOR';
    message?: string;
  }) {
    return prisma.orderInvite.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    });
  }

  // Accept an invite
  async acceptInvite(inviteId: string, userId: string) {
    // Optionally: check that userId is either tutorId or studentId
    return prisma.orderInvite.update({
      where: { id: inviteId },
      data: { status: 'ACCEPTED' },
    });
  }

  // Refuse an invite
  async refuseInvite(inviteId: string, userId: string) {
    // Optionally: check that userId is either tutorId or studentId
    return prisma.orderInvite.update({
      where: { id: inviteId },
      data: { status: 'REFUSED' },
    });
  }

  // Get a single invite by ID
  async getInviteById(inviteId: string) {
    return prisma.orderInvite.findUnique({
      where: { id: inviteId },
    });
  }

  // Get all invites for a specific order
  async getInvitesForOrder(orderId: string) {
    return prisma.orderInvite.findMany({
      where: { orderId },
    });
  }

  // Get all invites for a user (as tutor or student)
  async getInvitesForUser(userId: string) {
    return prisma.orderInvite.findMany({
      where: {
        OR: [
          { tutorId: userId },
          { studentId: userId },
        ],
      },
    });
  }
} 