import { Body, Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Quest, User } from '@prisma/client';

@Controller('quest')
export class QuestController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllQuest(): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {
        available: true,
      },
    });
  }
}
