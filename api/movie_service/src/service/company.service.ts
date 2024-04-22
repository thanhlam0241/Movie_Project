import { BaseService } from "./base.service";

// Create company service
import Company, { ICompany } from "@/models/company.model";

export class CompanyService extends BaseService<ICompany> {
  constructor() {
    super(Company);
  }
}
