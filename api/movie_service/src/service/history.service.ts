import { BaseService } from "./base.service";
import { IHistory } from "@/models/history.model";

export class HistoryService extends BaseService<IHistory> {
  public async addMovieToHistory(idUser: any, idMovie: any) {
    const isExist = await this.model.exists({
      user_id: idUser,
      movie_id: idMovie,
    });
    if (isExist) {
      throw new Error("Movie already in history list");
    }
    return await this.create({
      user_id: idUser,
      movie_id: idMovie,
      date: new Date(),
    });
  }

  public async removeMovieFromHistory(idUser: any, idMovie: any) {
    const isExist = await this.model.exists({
      user_id: idUser,
      movie_id: idMovie,
    });
    if (!isExist) {
      throw new Error("Movie not in history list");
    }
    return await this.model.deleteOne({ user_id: idUser, movie_id: idMovie });
  }

  public async getListHistory(idUser: any, page: number, limit: number) {
    return await this.model
      .find({ user_id: idUser })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }
}
