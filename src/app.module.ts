import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma.service';
import { QuestController } from './quest/quest.controller';

@Module({
  controllers: [AppController, UserController, QuestController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
