import { Body, Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Quest, User } from '@prisma/client';

type QuestListing = Pick<
  Quest,
  'title' | 'thumbnailUrl' | 'description' | 'difficulty' | 'createdAt'
>;

@Controller('quest')
export class QuestController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllQuest(): Promise<QuestListing[]> {
    // TODO: append status from prgress

    return this.prisma.quest.findMany({
      select: {
        thumbnailUrl: true,
        title: true,
        description: true,
        difficulty: true,
        createdAt: true,
      },
      where: {
        available: true,
      },
    });
  }

  @Get(':id')
  async getQuestById(@Param('id') id: string): Promise<Quest | undefined> {
    // TODO: append in-progress count

    return this.prisma.quest.findUnique({
      where: {
        id: Number(id),
      },
    });
  }
}
