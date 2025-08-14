import {Request, Response} from 'express';
import nodemailer from 'nodemailer';


export class EmailController {
  async sendEmail(req: Request, res: Response): Promise<void> {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      res.status(400).json({ error: "Todos os campos são obrigatórios" });
      return;
    }

    // Configure o transporter (exemplo com Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "software.food.zone@gmail.com",
        pass: "ltgp zfou hdoe jepe"
      }
    });

    try {
      await transporter.sendMail({
        from: "software.food.zone@gmail.com",
        to,
        subject,
        text
      });
      res.status(200).json({ success: true, message: "E-mail enviado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao enviar e-mail", details: error });
    }
  }
}
