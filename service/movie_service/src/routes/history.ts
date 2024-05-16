import { Router } from "express";
import { HistoryController } from "@/controllers/history.controller";
import { HistoryService } from "@/service/history.service";
import History from "@/models/history.model";

const router = Router();

const service = new HistoryService(History);

const controller = new HistoryController(service);

router.get("/:id", controller.getHistoryByUserId);

router.post("/", controller.addMovieToHistory);

router.delete("/", controller.removeMovieFromHistory);

export default router;
