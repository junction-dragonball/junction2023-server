import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma.service';
import { QuestController } from './quest/quest.controller';
import { RestaurantController } from './restaurant/restaurant.controller';

@Module({
  controllers: [
    AppController,
    UserController,
    QuestController,
    RestaurantController,
  ],
  providers: [AppService, PrismaService],
})
export class AppModule {}
