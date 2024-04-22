import People, { IPeople } from "@/models/people.model";
import { BaseService } from "./base.service";

export class PeopleService extends BaseService<IPeople> {
  constructor(people = People) {
    super(people);
  }
}
