import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlertsModule } from './modules/alerts/alerts.module';
import { ChatsModule } from './modules/chats/chats.module';
import { LikesModule } from './modules/likes/likes.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, ChatsModule, LikesModule, AlertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
