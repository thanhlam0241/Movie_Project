import Genre, { IGenre } from "../models/genre.model";
import { BaseService } from "./base.service";

export class GenreService extends BaseService<IGenre> {
  public async search(page: number, offset: number, search: string = "") {
    if (page <= 0 || offset <= 0)
      return {
        page: 0,
        size: 0,
        results: [],
        total_results: 0,
        total_pages: 0,
      };
    const filter = search
      ? {
          $text: {
            $search: `\"${search}\"`,
          },
        }
      : {};
    const totalDocument = await this.model.countDocuments(filter).exec();
    const data = await this.model
      .find(filter)
      .select("id name -_id")
      .sort({ id: 1 })
      .skip(offset * (page - 1))
      .limit(offset);
    return {
      page,
      size: offset,
      results: data,
      total_results: totalDocument,
      total_pages: Math.ceil(totalDocument / offset),
    };
  }
}
