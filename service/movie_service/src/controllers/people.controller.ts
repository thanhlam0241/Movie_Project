import { BaseController } from "./base.controller";
import { PeopleService } from "@/service/people.service";
import { IPeople } from "@/models/people.model";
import { Request, Response } from "express";

class PeopleController extends BaseController<IPeople> {
  constructor(service: PeopleService) {
    super(service);
  }
  searchText = async (req: Request, res: Response) => {
    const body = req.body;
    const searchString: string = body.search;
    const page: number = body.page;
    const size: number = body.size;
    const serviceH = this.service as PeopleService;

    const result = await serviceH.search(page, size, searchString);
    return res.json(result);
  };
}

export { PeopleController };
