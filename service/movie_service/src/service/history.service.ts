import { BaseService } from "./base.service";
import { IHistory } from "@/models/history.model";
import Movie from "@/models/movie.model";
import { sendMessage } from "@/config/kafka";

export class HistoryService extends BaseService<IHistory> {
  public async addMovieToHistory(idUser: any, idMovie: any) {
    let message = null;
    try {
      const isExist = await this.model.exists({
        user_id: idUser,
        movie_id: idMovie,
      });
      if (isExist) {
        throw new Error("Movie already in history list");
      }
      message = {
        user_id: idUser,
        movie_id: idMovie,
        behavior: "WATCH",
      };
      return await this.create({
        user_id: idUser,
        movie_id: idMovie,
        date: new Date(),
      });
    } catch (ex) {
      console.log(ex);
    } finally {
      if (message) sendMessage("movie-behaviors", message);
    }
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

  public async getListHistory(idUser: any, page: number, limit: number = 20) {
    const totalDocument = await this.model
      .countDocuments({ user_id: idUser })
      .exec();
    if (totalDocument === 0) {
      return {
        results: [],
        total_pages: 0,
        page: 1,
        total_results: 0,
      };
    }
    const dataIds = await this.model
      .find({ user_id: idUser })
      .select("movie_id")
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const data = await Movie.find({
      id: { $in: dataIds.map((item) => item.movie_id) },
    })
      .select("id genres poster_path vote_average vote_count")
      .lean();

    return {
      results: data,
      total_pages: Math.ceil(totalDocument / limit),
      page: 1,
      total_results: totalDocument,
    };
  }
}
