import { BaseService } from "./base.service";
import Review, { IReview } from "@/models/review.model";

export class ReviewService extends BaseService<IReview> {
  public findByMovieIdAndUserId = async (movieId: number, userId: number) => {
    const data = await this.model.findOne({
      movie_id: movieId,
      user_id: userId,
    });
    return data;
  };
}
