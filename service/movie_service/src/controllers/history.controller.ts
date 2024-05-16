import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { HistoryService } from "../service/history.service";
import { IHistory } from "../models/history.model";
import { getNumberString } from "@/helper/validate";

export class HistoryController extends BaseController<IHistory> {
  constructor(service: HistoryService) {
    super(service);
  }

  public getHistoryByUserId = async (req: Request, res: Response) => {
    try {
      const userId = getNumberString(req?.params?.id);
      const page = getNumberString(req?.query?.page);
      const limit = getNumberString(req?.query?.limit);

      if (!userId || !page || !limit) {
        return res.status(400).send("Invalid request");
      }

      const serviceH = this.service as HistoryService;

      const history = await serviceH.getListHistory(userId, page, limit);

      if (!history) {
        return res.status(404).send("History not found");
      }

      return res.json(history);
    } catch (error: any) {
      res.status(500).send({ message: error?.message || error });
    }
  };

  public addMovieToHistory = async (req: Request, res: Response) => {
    try {
      const userId = getNumberString(req?.body?.userId);
      const movieId = getNumberString(req?.body?.movieId);

      if (!userId || !movieId) {
        return res.status(400).send("Invalid request");
      }

      const serviceH = this.service as HistoryService;

      await serviceH.addMovieToHistory(userId, movieId);

      return res.status(200).send("Movie added to history list");
    } catch (error: any) {
      res.status(500).send({ message: error?.message || error });
    }
  };

  public removeMovieFromHistory = async (req: Request, res: Response) => {
    try {
      const userId = getNumberString(req?.body?.userId);
      const movieId = getNumberString(req?.body?.movieId);

      if (!userId || !movieId) {
        return res.status(400).send("Invalid request");
      }

      const serviceH = this.service as HistoryService;

      await serviceH.removeMovieFromHistory(userId, movieId);

      return res.status(200).send("Movie removed from history list");
    } catch (error: any) {
      res.status(500).send({ message: error?.message || error });
    }
  };
}
