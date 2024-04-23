import { BaseService } from "./base.service";
import Review, { IReview } from "@/models/review.model";

export class ReviewService extends BaseService<IReview> {
  constructor() {
    super(Review);
  }

  public async findByMovieIdAndUserId(movieId: number, userId: number) {
    return await this.model.findOne({ movieId, userId });
  }
}