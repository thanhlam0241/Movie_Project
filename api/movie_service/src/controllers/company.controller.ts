import { BaseController } from "./base.controller";
import { CompanyService } from "@/service/company.service";
import { ICompany } from "@/models/company.model";

class CompanyController extends BaseController<ICompany> {
    constructor(service: CompanyService) {
        super(service);
    }
}

export { CompanyController };