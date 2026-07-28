import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,

  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY ERROR:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

console.log("SMTP CONFIG:", {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
});

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_FROM:", process.env.MAIL_FROM);
console.log("MAIL_TO:", process.env.MAIL_TO);

export async function sendLeadNotification(lead: any) {

  console.log("sendLeadNotification() called");

  try {

    console.log("Before sendMail()");

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: `New Property Enquiry - Property #${lead.propertyId}`,
      html: `
        <h2>New Property Enquiry</h2>

        <table border="1" cellpadding="10" cellspacing="0">
          <tr>
            <td><strong>Property ID</strong></td>
            <td>${lead.propertyId}</td>
          </tr>

          <tr>
            <td><strong>Name</strong></td>
            <td>${lead.name}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${lead.email}</td>
          </tr>

          <tr>
            <td><strong>Phone</strong></td>
            <td>${lead.phone}</td>
          </tr>

          <tr>
            <td><strong>Message</strong></td>
            <td>${lead.message}</td>
          </tr>
        </table>
      `,
    });

    // 👇 Add these lines here
    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("Message ID:", info.messageId);
    console.log("Full Response:", info);

    return info;

  } catch (error) {
    console.error("EMAIL SEND ERROR:", error);
    throw error;
  }
}