import { Router } from "express";
import movieController from "../controllers/movie.controller";
import "express-async-errors";

const router = Router();

router.get("/", movieController.getFilter);

router.get("/:movieId", movieController.getById);

router.post("/", movieController.createMovie);

router.patch("/:movieId", movieController.updateMovie);

router.delete("/:movieId", movieController.deleteMovie);

export default router;
