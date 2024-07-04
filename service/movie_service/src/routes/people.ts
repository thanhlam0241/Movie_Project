import { Router } from "express";
import { PeopleController } from "@/controllers/people.controller";
import { PeopleService } from "@/service/people.service";
import People from "@/models/people.model";

const router = Router();

const peopleService = new PeopleService(People);

const peopleController = new PeopleController(peopleService);

router.get("/", peopleController.getPaging);

router.get("/:id", peopleController.getById);

router.post("/", peopleController.create);

router.patch("/:id", peopleController.update);

router.delete("/:id", peopleController.delete);

router.post("/searchText", peopleController.searchText);

export default router;
