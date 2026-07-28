import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

console.log("SMTP SETTINGS:", {
  host: "smtp.gmail.com",
  port: 587,
});

transporter.verify((error) => {
  if (error) {
    console.error("GMAIL SMTP VERIFY ERROR:", error);
  } else {
    console.log("Gmail SMTP Server is ready");
  }
});

console.log("GMAIL CONFIG:", {
  user: process.env.MAIL_USER,
  from: process.env.MAIL_FROM,
  to: process.env.MAIL_TO,
});

export async function sendLeadNotification(lead: any) {
  console.log("sendLeadNotification() called");

  try {
    const info = await transporter.sendMail({
      from: `"LeadTap Properties" <${process.env.MAIL_FROM}>`,
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

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error);
    throw error;
  }
}