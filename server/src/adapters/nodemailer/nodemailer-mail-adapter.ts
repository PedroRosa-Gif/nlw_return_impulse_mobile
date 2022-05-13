import { MailAdapter, SendMailData } from "../mail-adapter";
import  nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a494b4decb916b",
      pass: "3be3c65474b9e6"
    }
});

export class NodemailerMailAdpater implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <feed@gmail.com>',
            to: 'Pedro Rosa <pedrolucaslr01@gmail.com>',
            subject,
            html: body,
        });
    }
}