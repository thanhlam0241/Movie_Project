import { getNumberString, getSortOrder } from "@/helper/validate";
import { Request, Response } from "express";
import {
  getPaging,
  getById,
  updateById,
  create,
  deleteById,
  UpdateModel,
  CreateModel,
} from "@/service/movie.service";

class MovieController {
  async getFilter(req: Request, res: Response) {
    const query = req.query;
    const page = getNumberString(query?.page);
    const offset = getNumberString(query?.offset);
    const sort =
      typeof query?.sort === "string" && query?.sort ? query?.sort : "id";
    const sortOrder = getSortOrder(query?.sort_order);

    if (query == null || page == null || offset == null) {
      return res.status(400).send("Bad Request! Missing query parameters.");
    }

    const result = await getPaging(page, offset, sort, sortOrder);

    return res.json(result);
  }
  async getById(req: Request, res: Response) {
    const id = parseInt(req?.params?.movieId);
    const response = await getById(id);
    return res.send(response);
  }
  async createMovie(req: Request, res: Response) {
    const data: CreateModel = req.body;
    await create(data);
    return res.status(201).send("Created successfully");
  }
  async updateMovie(req: Request, res: Response) {
    const id = parseInt(req?.params?.movieId);
    const data: UpdateModel = req.body;
    await updateById(id, data);
    return res.status(204).send("Updated successfully");
  }
  async deleteMovie(req: Request, res: Response) {
    const id = parseInt(req?.params?.movieId);
    await deleteById(id);
    return res.status(204).send("Deleted successfully");
  }
}

export default new MovieController();
