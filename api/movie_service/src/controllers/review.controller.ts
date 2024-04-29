import { BaseController } from "./base.controller";
import { ReviewService } from "@/service/review.service";
import { IReview } from "@/models/review.model";
import e from "express";

class ReviewController extends BaseController<IReview> {
    constructor(service: ReviewService) {
        super(service);
    }
}

export { ReviewController };