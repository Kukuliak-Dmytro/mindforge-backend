import prisma from '../utils/prisma';

export class UserService {
  async getAllTutors() {
    return prisma.user.findMany({
      where: { role: 'TUTOR' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarUrl: true,
        bio: true,
      },
    });
  }
} 