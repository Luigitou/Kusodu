import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { Grid, Prisma } from '@prisma/client';

@Injectable()
export class GridService {
  constructor(private readonly prisma: PrismaService) {}

  async getGrid(amount: number = 1): Promise<Grid[]> {
    const query = Prisma.sql`
        SELECT *
        FROM "Grid"
        ORDER BY RANDOM()
            LIMIT ${amount};
    `;

    return await this.prisma.$queryRaw<Grid[]>(query);
  }
}
