import { NextFunction, Request, RequestHandler, Response } from "express";

export const awaitHandlerFactory = (middleware: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
