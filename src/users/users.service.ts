import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User | null> {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByEmailWithHash(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      omit: { pass_hash: false },
    });
  }

  async update(
    data: Prisma.UserUpdateInput,
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.update({ data, where });
  }
}
