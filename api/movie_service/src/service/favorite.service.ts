import { BaseService } from "./base.service";
import Favorite, { IFavorite } from "@/models/favorite.model";
import { getByListId } from './movie.service';
export class FavoriteService extends BaseService<IFavorite> {
    constructor() {
        super(Favorite);
    }

    public async getFavoriteByUserId(userId: any, page: number, limit: number) {
        const favorite = await this.model.findOne({ user_id: userId });
        if (!favorite) {
            throw new Error("Favorite not found");
        }

        const movies : Number[] = favorite?.movies;

        if (!movies || !(movies?.length > 0)) {
            return {
                data: [],
                total: 0,
                page,
                limit,
            };
        }

        const skip = (page - 1) * limit;
        const dataIds = movies.slice(skip, skip + limit);

        return await getByListId(dataIds);
    }

    public async addMovieToFavorite(idUser: any, idMovie: any) {
        const favorite = await this.model.findOne({ user_id: idUser });
        if (!favorite || !favorite.movies) {
            throw new Error("Favorite list not found");
        }

        if (favorite?.movies?.includes(idMovie)) {
            throw new Error("Movie already in favorite list");
        }

        favorite.movies.push(idMovie);
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