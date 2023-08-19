import {
  Controller,
  Get,
  Param,
  Post,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Quest } from '@prisma/client';

type QuestDto = Quest & { status: string };

@Controller('quest')
export class QuestController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllQuest(
    @Headers('Authorization') userId: string,
  ): Promise<QuestDto[]> {
    const questsWithProgress = await this.getQuestWithProgress(Number(userId));

    return questsWithProgress.map((quest) => {
      if (quest.Progress.length === 0) {
        return {
          ...quest,
          status: 'NOT_STARTED',
        };
      } else {
        const progress = quest.Progress[0];
        return {
          ...quest,
          status: progress.status,
        };
      }
    });
  }

  async getQuestWithProgress(userId: number) {
    return this.prisma.quest.findMany({
      where: {
        available: true,
      },
      include: {
        Progress: {
          where: {
            userId: userId,
          },
        },
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
    if (!quest) throw new BadRequestException('Quest not found');

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
    if (!progress) throw new BadRequestException('Progress not found');
    if (new Date() > progress.endDate)
      throw new BadRequestException('Quest expired');
    if (progress.status !== 'IN_PROGRESS')
      throw new BadRequestException('Status invalid: ' + progress.status);
    if (progress.quest.reward <= progress.totalReward)
      throw new BadRequestException('Quest already completed');

    const newTotalReward = progress.totalReward + progress.unitReward;
    const partialProgress =
      newTotalReward >= progress.quest.reward
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
