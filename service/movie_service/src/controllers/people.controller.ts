import { BaseController } from "./base.controller";
import { PeopleService } from "@/service/people.service";
import { IPeople } from "@/models/people.model";

class PeopleController extends BaseController<IPeople> {
  constructor(service: PeopleService) {
    super(service);
  }
}

export { PeopleController };
