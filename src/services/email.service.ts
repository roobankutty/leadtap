import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(lead: any) {
  try {
    const result = await resend.emails.send({
      from: "LeadTap <onboarding@resend.dev>",
      to: process.env.MAIL_TO!,
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

    console.log("Email sent:", result);

    return result;
  } catch (error) {
    console.error("Resend Error:", error);
    throw error;
  }
}