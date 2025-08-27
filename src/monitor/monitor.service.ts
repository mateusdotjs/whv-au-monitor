import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import { NotificationService } from 'src/monitor/notification.service';

@Injectable()
export class MonitorService {
  private readonly TARGET_URL =
    'https://immi.homeaffairs.gov.au/what-we-do/whm-program/status-of-country-caps';

  constructor(private notificationService: NotificationService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkStatus() {
    try {
      const status = await this.getBrazilStatus();

      if (status === 'PAUSED' || status === '' || !status) return;

      console.log(status);

      await this.notificationService.sendDiscord(
        '⚠️ Status das inscrições: ' + status + ' ⚠️',
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getBrazilStatus() {
    const response = await fetch(this.TARGET_URL);
    if (!response.ok) {
      throw new InternalServerErrorException();
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // procura na única table da página a <tr> onde o primeiro <td> contém "Brazil"
    const brazilRow = $('table tbody tr')
      .filter((i, el) => $(el).find('td').first().text().trim() === 'Brazil')
      .first();

    const status = brazilRow.find('td span').text().trim().toUpperCase();

    return status;
  }
}
