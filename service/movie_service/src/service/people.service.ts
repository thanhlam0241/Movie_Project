import People, { IPeople } from "@/models/people.model";
import { BaseService } from "./base.service";

export class PeopleService extends BaseService<IPeople> {
  constructor(people = People) {
    super(people);
  }
  public async search(page: number, offset: number, search: string = "") {
    const filter = search
      ? {
          $text: {
            $search: `\"${search}\"`,
          },
        }
      : {};
    const totalDocument = await this.model.countDocuments(filter).exec();
    const data = await this.model
      .find(filter)
      .select("id name gender job place_of_birth birthday")
      .sort({ id: 1 })
      .skip(offset * (page - 1))
      .limit(offset);
    return {
      page,
      size: offset,
      results: data,
      total_results: totalDocument,
      total_pages: Math.ceil(totalDocument / offset),
    };
  }
}
