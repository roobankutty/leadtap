import { Router } from "express";
import { fetchTaxonomies } from "../controllers/taxonomy.controller";

const router = Router();

router.get("/", fetchTaxonomies);

export default router;