import { Router } from "express";
import { GenreController } from "@/controllers/genres.controller";
import { GenreService } from "@/service/genres.service";
import Genre from "@/models/genre.model";

const router = Router();

const service = new GenreService(Genre);

const controller = new GenreController(service);

router.get("/", controller.getPaging);

router.get("/all", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.createIdNumber);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

router.post("/searchText", controller.searchText);

export default router;
