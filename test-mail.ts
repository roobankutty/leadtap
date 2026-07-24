import "dotenv/config";
import nodemailer from "nodemailer";

async function test() {
  console.log({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
  });

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER!,
      pass: process.env.MAIL_PASS!,
    },
    logger: true,
    debug: true,
  });

  await transporter.verify();

  console.log("SMTP connection successful!");
}

test().catch(console.error);