import { BaseService } from "./base.service";
import Favorite, { IFavorite } from "@/models/favorite.model";
import { getByListId } from "./movie.service";
import Movie from "@/models/movie.model";

export class FavoriteService extends BaseService<IFavorite> {
  public async getFavoriteByUserId(
    userId: any,
    page: number,
    limit: number = 20
  ) {
    const favorite = await this.model.findOne({ user_id: userId });
    if (!favorite) {
      const newFavorite = new Favorite({
        user_id: userId,
        movies: [],
      });
      await newFavorite.save();
      return {
        results: [],
        page: 1,
        total_pages: 0,
        total_results: 0,
      };
    }

    const movies: Number[] = favorite?.movies;

    if (!movies || !(movies?.length > 0)) {
      return {
        results: [],
        page: 1,
        total_pages: 0,
        total_results: 0,
      };
    }

    const skip = (page - 1) * limit;
    const dataIds = movies.slice(skip, skip + limit);

    const data = await Movie.find({ id: { $in: dataIds } }).lean();

    return {
      results: data,
      page: page,
      total_pages: Math.ceil(movies.length / limit),
      total_results: movies.length,
      size: limit,
    };
  }

  public async addMovieToFavorite(idUser: any, idMovie: any) {
    let isUserExist = await this.model.findOne({ user_id: idUser });
    if (!isUserExist) {
      throw new Error("User not found");
    }
    let favorite = await this.model.findOne({ user_id: idUser });
    if (!favorite || !favorite.movies) {
      favorite = new Favorite({
        user_id: idUser,
        movies: [idMovie],
      });
    } else if (favorite?.movies?.includes(idMovie)) {
      throw new Error("Movie already in favorite list");
    } else {
      favorite.movies.unshift(idMovie);
    }
    await favorite.save();
  }

  public async removeMovieFromFavorite(idUser: any, idMovie: any) {
    const favorite = await this.model.findOne({ user_id: idUser });
    if (!favorite || !favorite.movies) {
      throw new Error("Favorite list not found");
    }

    if (!favorite?.movies?.includes(idMovie)) {
      throw new Error("Movie not in favorite list");
    }

    favorite.movies = favorite.movies.filter((movie) => movie !== idMovie);
    await favorite.save();
  }
}
