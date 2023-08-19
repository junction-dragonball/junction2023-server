import { Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Quest } from '@prisma/client';

type QuestListing = Pick<
  Quest,
  | 'id'
  | 'title'
  | 'thumbnailUrl'
  | 'shortDescription'
  | 'difficulty'
  | 'createdAt'
>;

@Controller('quest')
export class QuestController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllQuest(): Promise<QuestListing[]> {
    // TODO: append status from prgress

    return this.prisma.quest.findMany({
      select: {
        id: true,
        thumbnailUrl: true,
        title: true,
        shortDescription: true,
        difficulty: true,
        createdAt: true,
      },
      where: {
        available: true,
      },
    });
  }

  @Post(':id/init')
  async startQuest(
    @Param('id') id: string,
    @Headers('Authorization') userId: string,
  ) {
    const quest = await this.prisma.quest.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!quest) throw new Error('Quest not found');

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + quest.period);

    return this.prisma.progress.create({
      data: {
        questId: Number(id),
        userId: Number(userId),
        status: 'IN_PROGRESS',
        unitReward: quest.reward / quest.period,
        endDate: endDate,
      },
    });
  }

  @Post(':id/get-point')
  async getPoint(
    @Param('id') id: string,
    @Headers('Authorization') userId: string,
  ) {
    const progress = await this.prisma.progress.findFirst({
      where: {
        userId: Number(userId),
        questId: Number(id),
      },
      include: {
        quest: true,
        user: true,
      },
    });
    if (!progress) throw new Error('Progress not found');
    if (new Date() > progress.endDate) throw new Error('Quest expired');
    if (progress.status !== 'IN_PROGRESS')
      throw new Error('Status invalid: ' + progress.status);
    if (progress.quest.reward <= progress.totalReward)
      throw new Error('Quest already completed');

    const newTotalReward = progress.totalReward + progress.unitReward;
    const partialProgress =
      newTotalReward >= progress.totalReward
        ? { status: 'COMPLETED', totalReward: newTotalReward }
        : { totalReward: newTotalReward };

    return {
      progress: await this.prisma.progress.update({
        where: {
          id: progress.id,
        },
        data: partialProgress,
      }),
      user: await this.prisma.user.update({
        where: {
          id: progress.user.id,
        },
        data: {
          points: progress.user.points + progress.unitReward,
        },
      }),
    };
  }

  @Get(':id')
  async getQuestById(@Param('id') id: string): Promise<Quest | undefined> {
    // TODO: append in-progress count

    return this.prisma.quest.findUnique({
      where: {
        id: Number(id),
      },
      include: {},
    });
  }
}
