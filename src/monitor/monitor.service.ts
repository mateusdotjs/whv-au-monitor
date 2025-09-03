import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import { NotificationService } from 'src/monitor/notification.service';

@Injectable()
export class MonitorService {
  private lastStatus: string = '';

  constructor(private notificationService: NotificationService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkStatus() {
    try {
      const status = await this.getBrazilStatus();
      console.log(status);

      if (status === this.lastStatus) return;
      if (status === '' || !status) return;
      if (status === 'PAUSED' && this.lastStatus === '') {
        this.lastStatus = status;
        return;
      }

      await this.notificationService.sendDiscord(
        '⚠️ Status das inscrições: ' + status + ' ⚠️',
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getBrazilStatus() {
    const response = await fetch(process.env.TARGET_URL as string);
    if (!response.ok) {
      throw new InternalServerErrorException();
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // procura na única table da página a <tr> onde o primeiro <td> contém "Brazil"
    const brazilRow = $('table tbody tr')
      .filter((i, el) => $(el).find('td').first().text().trim() === 'Brazil')
      .first();

    const rawStatus = brazilRow.find('td span').text();
    const status = rawStatus.replace(/[^a-zA-Z]/g, '').toUpperCase();
    return status;
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async healthcheck() {
    try {
      await this.notificationService.sendDiscord(
        'Não se preocupem eu estou bem 😎',
      );
    } catch (error) {
      console.error(error);
    }
  }
}
