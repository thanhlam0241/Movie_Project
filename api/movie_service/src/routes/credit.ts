import { Router } from "express";
import { CreditController } from "@/controllers/credit.controller";
import { CreditService } from "@/service/credit.service";
import Credit from "@/models/credit.model";

const router = Router();

const service = new CreditService(Credit);

const controller = new CreditController(service);

router.get("/:id", controller.getPeopleInCredits);

export default router;
