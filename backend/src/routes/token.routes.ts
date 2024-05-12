import express from "express";
import TokenCtrl from "../controllers/token.controller";
import { awaitHandlerFactory } from "../middlewares/awaitHandlerFactory";

const router = express.Router();

// todo: make protected, add validation
router.get("/tokens/", awaitHandlerFactory(TokenCtrl.getTokens));

export default router;
