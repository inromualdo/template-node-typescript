import { Request, Response } from "express";
import { getPlacesByName } from "./SearchController";
import { checkSearchParams } from "../../middleware/checks";

import { Get, Post, Api } from '../../decorators';

@Api(
  'search'
)
export default class Search {
  constructor() { }

  @Get({
    middlewares: checkSearchParams
  })
  async get({ query }: Request, res: Response) {
    const result = await getPlacesByName(query.q);
    res.status(200).send(result);
  }

  @Post()
  post() {

  }

  @Post()
  post2() {

  }
}