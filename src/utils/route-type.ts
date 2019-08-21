import { Request, Response, NextFunction } from "express";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export type Route = {
  path: string | string[];
  method: string;
  handler: Handler | Handler[];
};