import { BaseController } from "./base.controller";
import { ReviewService } from "@/service/review.service";
import { IReview } from "@/models/review.model";
import { getNumberString } from "@/helper/validate";

class ReviewController extends BaseController<IReview> {
  constructor(service: ReviewService) {
    super(service);
  }
  public findByMovieIdAndUserId = async (req: any, res: any) => {
    try {
      const movieId = getNumberString(req?.params?.movieId);
      const userId = getNumberString(req?.params?.userId);
      if (movieId === null || userId === null) {
        return res.status(400).send("Invalid request");
      }
      const serviceF = this.service as ReviewService;
      const result = await serviceF.findByMovieIdAndUserId(movieId, userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export { ReviewController };
