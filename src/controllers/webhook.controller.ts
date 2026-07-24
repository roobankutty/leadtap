import { Request, Response } from "express";
import { processCRMWebhook } from "../services/webhook.service";


export const crmWebhook = async (
    req: Request,
    res: Response
) => {

    try {

        // Validate CRM Secret
        const crmSecret = req.headers["x-crm-secret"];

        if (crmSecret !== process.env.CRM_SECRET) {

            return res.status(401).json({
                success: false,
                message: "Invalid webhook secret"
            });

        }


        const payload = req.body;


        if (!payload.event) {

            return res.status(400).json({
                success: false,
                message: "Event is required"
            });

        }


        const result = await processCRMWebhook(payload);


        return res.status(200).json(result);


    } catch (error) {

        console.error(error);


        return res.status(500).json({

            success: false,
            message: "Webhook processing failed"

        });

    }

};