import express from "express";

import { generateSummaryTitle, generateEnhancedContent } from "../controllers/AIRoutesController.js";

const router = express.Router();

router.post("/generate-summary-title", generateSummaryTitle);
router.post("/generate-enhanced-content", generateEnhancedContent);

export default router;
