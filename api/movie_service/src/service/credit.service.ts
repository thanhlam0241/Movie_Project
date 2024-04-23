import Credit, { ICredit } from "@/models/credit.model";

import { BaseService } from "./base.service";

export class CreditService extends BaseService<ICredit> {
  constructor() {
    super(Credit);
  }
}