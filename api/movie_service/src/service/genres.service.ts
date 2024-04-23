import Genre, { IGenre } from "../models/genre.model";
import { BaseService } from "./base.service";

export class GenreService extends BaseService<IGenre> {
  constructor() {
    super(Genre);
  }
}