import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestModule } from './quest/quest.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [QuestModule, RestaurantModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
