import { Request, Response } from "express";
import { createLead } from "../services/lead.service";
import { getAllLeads } from "../services/leadStorage.service";
import { asyncHandler } from "../utils/asyncHandler";

export const submitLead = asyncHandler(


  async (req: Request, res: Response) => {
	  	console.log("SUBMIT LEAD CONTROLLER CALLED");
    const result = await createLead(req.body);

    res.status(201).json(result);
  }
);

export const getLeads = asyncHandler(
  async (req: Request, res: Response) => {

    const result = await getAllLeads();

    res.status(200).json(result);

  }
);
