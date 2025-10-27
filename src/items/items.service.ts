import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async item(where: Prisma.ItemWhereUniqueInput): Promise<Item | null> {
    const item = await this.prisma.item.findUnique({ where });

    if (!item) throw new NotFoundException('Item with this ID not found');

    return item;
  }

  async items(where: Prisma.ItemWhereInput): Promise<Item[] | null> {
    return this.prisma.item.findMany({ where });
  }

  async createItem(data: Prisma.ItemCreateInput): Promise<Item> {
    return this.prisma.item.create({
      data,
    });
  }

  async updateItem(
    data: Prisma.ItemUpdateInput,
    where: Prisma.ItemWhereUniqueInput,
  ): Promise<Item | null> {
    return this.prisma.item.update({ data, where });
  }

  async deleteItem(where: Prisma.ItemWhereUniqueInput): Promise<Item> {
    return this.prisma.item.delete({ where });
  }
}
