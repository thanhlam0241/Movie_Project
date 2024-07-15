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
  search,
  getRecommendMovie,
  searchByElastic,
  getLastestReleasedMovie,
  getTopPopularMovie,
  getTopRated,
} from "@/service/movie.service";

class MovieController {
  async getFilter(req: Request, res: Response) {
    try {
      const query = req.query;
      const page = getNumberString(query?.page);
      const size = getNumberString(query?.size);
      const sort =
        typeof query?.sort_by === "string" && query?.sort_by
          ? query?.sort_by
          : "id";
      const sortOrder = getSortOrder(query?.sort_order);
      const genres = Array.isArray(req.body.genres) ? req.body.genres : [];

      if (query == null) {
        return res.status(400).send("Bad Request! Missing query parameters.");
      }

      const result = await getPaging(
        page ?? 1,
        size ?? 20,
        sort,
        sortOrder,
        genres
      );

      return res.json(result);
    } catch (ex) {
      console.log(ex);
    }
  }
  async searchText(req: Request, res: Response) {
    try {
      const body = req.body;
      const searchString: string = body.search;
      const page: number = body.page;
      const size: number = body.size;
      const result = await search(page, size, searchString);
      return res.json(result);
    } catch (ex) {
      console.log(ex);
    }
  }
  async getPopular(req: Request, res: Response) {
    try {
      const result = await getTopPopularMovie();
      return res.json({
        data: result,
      });
    } catch (ex) {
      console.log(ex);
    }
  }
  async getLastestReleased(req: Request, res: Response) {
    try {
      const result = await getLastestReleasedMovie();
      return res.json({
        data: result,
      });
    } catch (ex) {
      console.log(ex);
      return res.json({
        data: [],
      });
    }
  }
  async getTopRated(req: Request, res: Response) {
    try {
      const result = await getTopRated();
      return res.json({
        data: result,
      });
    } catch (ex) {
      console.log(ex);
      return res.json({
        data: [],
      });
    }
  }
  async getRecommend(req: Request, res: Response) {
    try {
      const body = req.body;
      const userId: number = body?.userId;
      if (!userId && userId !== 0) return res.json([]);
      const result = await getRecommendMovie(userId);
      return res.json({
        data: result,
      });
    } catch (ex) {
      console.log(ex);
    }
  }
  async getById(req: Request, res: Response) {
    try {
      console.log(req?.params);
      const id = parseInt(req?.params?.movieId);
      const response = await getById(id);
      return res.send(response);
    } catch (ex) {
      console.log("ERROR");
    }
  }
  async createMovie(req: Request, res: Response) {
    try {
      const data: CreateModel = req.body;
      await create(data);
      return res.status(201).send("Created successfully");
    } catch (ex) {
      console.log(ex);
    }
  }
  async search(req: Request, res: Response) {
    try {
      const body = req.body;
      const searchString: string = body.search;
      const page: number = body.page;
      const size: number = body.size;
      const result = await searchByElastic(page, size, searchString);
      return res.json(result);
    } catch (ex) {
      console.log(ex);
    }
  }
  async updateMovie(req: Request, res: Response) {
    try {
      const id = parseInt(req?.params?.movieId);
      const data: UpdateModel = req.body;
      await updateById(id, data);
      return res.status(204).send("Updated successfully");
    } catch (ex) {
      console.log(ex);
    }
  }
  async deleteMovie(req: Request, res: Response) {
    try {
      const id = parseInt(req?.params?.movieId);
      await deleteById(id);
      return res.status(204).send("Deleted successfully");
    } catch (ex) {
      console.log(ex);
    }
  }
}

export default new MovieController();
