import { Module } from '@nestjs/common';
import { MonitorModule } from './monitor/monitor.module';
import { NotificationService } from './monitor/notification.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MonitorModule, ScheduleModule.forRoot(), ConfigModule.forRoot()],
  controllers: [],
  providers: [NotificationService],
})
export class AppModule {}
