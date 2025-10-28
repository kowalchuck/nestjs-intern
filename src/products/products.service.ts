import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async product(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where });

    if (!product) throw new NotFoundException('Product with this ID not found');

    return product;
  }

  async products(where: Prisma.ProductWhereInput): Promise<Product[] | null> {
    return this.prisma.product.findMany({ where });
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async updateProduct(
    data: Prisma.ProductUpdateInput,
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.update({ data, where });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({ where });
  }
}
