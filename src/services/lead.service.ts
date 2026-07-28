import logger from "../utils/logger";
import { sendLeadNotification } from "./email.service";
import { saveLead } from "./leadStorage.service";

export interface Lead {
  propertyId: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function createLead(lead: Lead) {

	//console.log("CREATE LEAD SERVICE CALLED");
	
  logger.info("New Lead Received", {
    propertyId: lead.propertyId,
    name: lead.name,
    email: lead.email,
  });

  try {

    const savedLead = await saveLead(lead);

    logger.info("Lead saved successfully", savedLead);

    await sendLeadNotification(lead);

    logger.info("Lead notification email sent successfully");

  } catch (error) {

    logger.error("Failed to process lead", error);

  }

  return {
    success: true,
    message: "Lead submitted successfully",
    lead,
  };
}