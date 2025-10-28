import { Injectable } from '@nestjs/common';
import { Category, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async categories(): Promise<Category[] | null> {
    return this.prisma.category.findMany();
  }

  async createCategory(
    data: Prisma.CategoryCreateInput,
  ): Promise<Category | null> {
    return this.prisma.category.create({ data });
  }

  async updateCetegory(
    data: Prisma.CategoryUpdateInput,
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prisma.category.update({ data, where });
  }

  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prisma.category.delete({ where });
  }
}
