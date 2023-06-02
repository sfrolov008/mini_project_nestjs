import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  send(
    to: string,
    subject: string,
    template: string,
    templateData?: any,
  ): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      to,
      subject,
      template,
      context: templateData,
    });
  }
}
