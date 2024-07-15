import { BaseController } from "./base.controller";
import { FavoriteService } from "../service/favorite.service";
import { IFavorite } from "../models/favorite.model";
import { getNumberString } from "@/helper/validate";
import { Request, Response } from "express";
import Movie from "@/models/movie.model";

export class FavoriteController extends BaseController<IFavorite> {
  constructor(service: FavoriteService) {
    super(service);
  }

  public getFavoriteByUserId = async (req: Request, res: Response) => {
    try {
      const userId = getNumberString(req?.params?.id);
      const page = getNumberString(req?.query?.page);
      const limit = getNumberString(req?.query?.limit);

      if ((!userId && userId !== 0) || !page || !limit) {
        return res.status(400).send("Invalid request");
      }

      const serviceF = this.service as FavoriteService;

      let favorite = await serviceF.getFavoriteByUserId(userId, page, limit);

      return res.json(favorite);
    } catch (error: any) {
      res.status(500).send({ message: error?.message || error });
    }
  };

  public addMovieToFavorite = async (req: Request, res: Response) => {
    try {
      const userId: number = req?.body?.userId;
      const movieId: number = req?.body?.movieId;

      if ((!userId && userId !== 0) || !movieId) {
        return res.status(400).send("Invalid request");
      }

      let isExistMovie = await Movie.exists({ id: movieId });
      if (!isExistMovie) {
        return res.status(404).send("Movie not found");
      }

      const serviceF = this.service as FavoriteService;

      await serviceF.addMovieToFavorite(userId, movieId);

      return res.status(200).send("Movie added to favorite list");
    } catch (error: any) {
      res.status(500).send({ message: error?.message || error });
    }
  };

  public removeMovieFromFavorite = async (req: Request, res: Response) => {
    try {
      const userId = getNumberString(req?.body?.userId);
      const movieId = getNumberString(req?.body?.movieId);

      if ((!userId && userId !== 0) || !movieId) {
        return res.status(400).send("Invalid request");
      }

      const serviceF = this.service as FavoriteService;

      await serviceF.removeMovieFromFavorite(userId, movieId);

      return res.status(200).send("Movie removed from favorite list");
    } catch (error: any) {
      res.status(500).send({ message: error?.message || error });
    }
  };
}
