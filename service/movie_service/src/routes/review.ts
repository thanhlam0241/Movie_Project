import { Router } from "express";
import { ReviewController } from "@/controllers/review.controller";
import { ReviewService } from "@/service/review.service";
import Review from "@/models/review.model";

const router = Router();

const service = new ReviewService(Review);

const controller = new ReviewController(service);

router.get("/", controller.getPaging);

router.get("/:id", controller.getById);

router.get("/:movieId/:userId", controller.findByMovieIdAndUserId);

router.post("/", controller.create);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;
