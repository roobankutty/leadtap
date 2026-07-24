import { Router } from "express";
import { crmWebhook } from "../controllers/webhook.controller";


const router = Router();


router.post(
    "/crm",
    crmWebhook
);


export default router;