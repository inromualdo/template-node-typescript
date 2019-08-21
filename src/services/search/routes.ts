import { Request, Response } from "express";
import { getPlacesByName } from "./SearchController";

import { Get, Post, Api } from '../../decorators';

@Api(
  'search'
)
export default class Search {
  constructor() { }

  @Get({
    query: {
      'q': 'string'
    }
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