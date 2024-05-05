import { Router } from "express";
import { CompanyController } from "@/controllers/company.controller";
import { CompanyService } from "@/service/company.service";
import Company from "@/models/company.model";

const router = Router();

const companyService = new CompanyService(Company);

const companyController = new CompanyController(companyService);

router.get("/", companyController.getPaging);

router.get("/:id", companyController.getById);

router.post("/", companyController.create);

router.patch("/:id", companyController.update);

router.delete("/:id", companyController.delete);

export default router;
