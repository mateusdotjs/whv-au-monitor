import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async sendDiscord(message: string) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL as string;

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message }),
      });

      if (!response.ok) {
        throw new Error(`Discord API retornou ${response.status}`);
      }

      return { success: true };
    } catch (err) {
      console.error('Erro ao enviar para Discord:', err);
      throw new InternalServerErrorException();
    }
  }
}
