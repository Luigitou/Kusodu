import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
}
