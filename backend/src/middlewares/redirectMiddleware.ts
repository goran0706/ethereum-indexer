import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { constructUrl, shouldRedirect } from "../libs/utils";

export const redirectMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (shouldRedirect(req.protocol)) {
    const { host, httpsPort } = config.serverOpts;
    const toUrl = constructUrl("https", host, httpsPort, req.url);
    return res.redirect(301, toUrl);
  }

  next();
};
