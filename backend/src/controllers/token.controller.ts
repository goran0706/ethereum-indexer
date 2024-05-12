import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token.service";

const getTokens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tokenService.getTokens();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export default { getTokens };
