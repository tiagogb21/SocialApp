import { IMailOptions } from '../@types/interfaces/IMailOptions';

import transporter from '../config/mail/mail.config';

export class MailService {
  constructor() {}

  async sendMail(mailOptions: IMailOptions): Promise<any> {
    const info = await transporter.sendMail(mailOptions);
    return info;
  }
}
