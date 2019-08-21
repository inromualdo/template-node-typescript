import 'reflect-metadata';
import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";
import { QUERY_METADATA } from '../decorators/utils/constant';

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredQueries = Reflect.getMetadata(QUERY_METADATA, checkSearchParams);

  for (const key in requiredQueries) {
    if (!req.query[key]) {
      throw new HTTP400Error(`Missing ${key} parameter`);
    }
    if (typeof req.query[key] !== requiredQueries[key]) {
      throw new HTTP400Error(`Query ${key} is not of type ${requiredQueries[key]}`);
    }
  }

  next();
};
