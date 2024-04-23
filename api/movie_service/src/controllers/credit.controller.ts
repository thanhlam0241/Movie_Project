import { BaseController } from "./base.controller";
import { CreditService } from "@/service/credit.service";
import { ICredit } from "@/models/credit.model";

class CreditController extends BaseController<ICredit> {
    constructor(service: CreditService) {
        super(service);
    }
}

export { CreditController };