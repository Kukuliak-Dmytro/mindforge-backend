import prisma from '../utils/prisma';

export class InviteService {
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

  // Create a new invite
  // tutorId and studentId are user IDs, will be converted to profile IDs
  async createInvite(data: {
    orderId: string;
    tutorId: string; // tutor userId
    studentId: string; // student userId
    senderRole: 'STUDENT' | 'TUTOR';
    message?: string;
  }) {
    const tutorProfileId = await this.getTutorProfileId(data.tutorId);
    if (!tutorProfileId) throw new Error('Tutor profile not found');
    
    const studentProfileId = await this.getStudentProfileId(data.studentId);
    if (!studentProfileId) throw new Error('Student profile not found');

    return prisma.orderInvite.create({
      data: {
        orderId: data.orderId,
        tutorProfileId,
        studentProfileId,
        senderRole: data.senderRole,
        message: data.message,
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
  // userId is user ID, will be converted to profile IDs
  async getInvitesForUser(userId: string) {
    // Get both profile IDs (user might be both tutor and student)
    const [tutorProfile, studentProfile] = await Promise.all([
      prisma.tutorProfile.findUnique({
        where: { userId },
        select: { id: true },
      }),
      prisma.studentProfile.findUnique({
        where: { userId },
        select: { id: true },
      }),
    ]);

    const conditions: any[] = [];
    if (tutorProfile) {
      conditions.push({ tutorProfileId: tutorProfile.id });
    }
    if (studentProfile) {
      conditions.push({ studentProfileId: studentProfile.id });
    }

    if (conditions.length === 0) {
      return []; // User has no profiles
    }

    return prisma.orderInvite.findMany({
      where: {
        OR: conditions,
      },
    });
  }
} 