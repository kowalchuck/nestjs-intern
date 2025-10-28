import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ omit: { user: { pass_hash: true } } });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
