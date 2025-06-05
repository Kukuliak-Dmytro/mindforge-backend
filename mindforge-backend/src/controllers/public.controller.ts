import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { BaseController } from './BaseController';

class PublicController extends BaseController {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  // Get all categories
  public getCategories = async (_req: Request, res: Response): Promise<void> => {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    this.sendSuccess(res, categories, 'Categories retrieved successfully');
  };

  // Get category by ID
  public getCategoryById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const category = await this.prisma.category.findUnique({
      where: { id }
    });

    if (!category) {
      this.throwError('Category not found', 404);
    }

    this.sendSuccess(res, category, 'Category retrieved successfully');
  };

  // Get all subjects
  public getSubjects = async (_req: Request, res: Response): Promise<void> => {
    const subjects = await this.prisma.subject.findMany({
      orderBy: { name: 'asc' }
    });

    this.sendSuccess(res, subjects, 'Subjects retrieved successfully');
  };

  // Get subject by ID
  public getSubjectById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const subject = await this.prisma.subject.findUnique({
      where: { id }
    });

    if (!subject) {
      this.throwError('Subject not found', 404);
    }

    this.sendSuccess(res, subject, 'Subject retrieved successfully');
  };
}

export default new PublicController(); 