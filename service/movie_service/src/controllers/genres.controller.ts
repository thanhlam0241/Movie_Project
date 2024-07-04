import { BaseController } from "./base.controller";
import { GenreService } from "@/service/genres.service";
import { IGenre } from "@/models/genre.model";
import { Request, Response } from "express";

export class GenreController extends BaseController<IGenre> {
  constructor(service: GenreService) {
    super(service);
  }
  searchText = async (req: Request, res: Response) => {
    const body = req.body;
    const searchString: string = body.search;
    const page: number = body.page;
    const size: number = body.size;
    const serviceH = this.service as GenreService;

    const result = await serviceH.search(page, size, searchString);
    return res.json(result);
  };
}
