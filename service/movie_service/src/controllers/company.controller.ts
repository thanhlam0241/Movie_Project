import { BaseController } from "./base.controller";
import { CompanyService } from "@/service/company.service";
import { ICompany } from "@/models/company.model";
import { Request, Response } from "express";

class CompanyController extends BaseController<ICompany> {
  constructor(service: CompanyService) {
    super(service);
  }
  searchText = async (req: Request, res: Response) => {
    const body = req.body;
    const searchString: string = body.search;
    const page: number = body.page;
    const size: number = body.size;

    const serviceH = this.service as CompanyService;

    const result = await serviceH.search(page, size, searchString);
    return res.json(result);
  };
}

export { CompanyController };
