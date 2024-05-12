import { NextFunction, Request, Response } from "express";
import { MSG } from "../libs/logMessages";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  let { status = 500, message, data } = error;

  console.log(MSG.ERROR(error));

  // If status code is 500 or status property does not exist, change the message to Internal server error
  message = status === 500 || !message ? "Internal server error" : message;

  error = {
    type: "error",
    status,
    message,
    ...(data && data),
  };
  res.status(status).send({ response: false, error: error });
};
