import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.verify();

    res.json({
      success: true,
      message: "Successfully connected to Gmail SMTP",
    });
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      success: false,
      code: err.code,
      message: err.message,
      command: err.command,
    });
  }
});

export default router;