import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { NotificationService } from 'src/monitor/notification.service';

@Module({
  providers: [MonitorService, NotificationService],
})
export class MonitorModule {}
