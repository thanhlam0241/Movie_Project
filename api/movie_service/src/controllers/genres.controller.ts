import { BaseController } from './base.controller';
import { GenreService } from '@/service/genres.service';
import { IGenre } from '@/models/genre.model';

export class GenreController extends BaseController<IGenre> {
    constructor(service: GenreService) {
        super(service);
    }
}