import { Router } from "express";
import movieController from "../controllers/movie.controller";
import "express-async-errors";

const router = Router();

router.post("/filter", movieController.getFilter);

router.get("/popular", movieController.getPopular);

router.get("/latest", movieController.getLastestReleased);

router.get("/top-rated", movieController.getTopRated);

router.get("/:movieId", movieController.getById);

router.post("/", movieController.createMovie);

router.patch("/:movieId", movieController.updateMovie);

router.delete("/:movieId", movieController.deleteMovie);

router.post("/recommend", movieController.getRecommend);

router.post("/searchText", movieController.searchText);

router.post("/search", movieController.search);

export default router;
