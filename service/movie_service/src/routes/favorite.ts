import { Router } from "express";
import { FavoriteController } from "@/controllers/favorite.controller";
import { FavoriteService } from "@/service/favorite.service";
import Favorite from "@/models/favorite.model";

const router = Router();

const service = new FavoriteService(Favorite);

const controller = new FavoriteController(service);

router.get("/:id", controller.getFavoriteByUserId);

router.post("/", controller.addMovieToFavorite);

router.delete("/", controller.removeMovieFromFavorite);

export default router;
