import { ICredit } from "@/models/credit.model";
import Crew, { ICrew } from "@/models/crew.model";
import Cast, { ICast } from "@/models/cast.model";
import { Model } from "mongoose";
import { BaseService } from "./base.service";

export class CreditService extends BaseService<ICredit> {
  protected crewModel: Model<ICrew>;
  protected castModel: Model<ICast>;
  constructor(credit: Model<ICredit>) {
    super(credit);
    this.crewModel = Crew;
    this.castModel = Cast;
  }

  async findCreditById(id: any): Promise<any> {
    const cast = await this.castModel.aggregate([
      {
        $match: {
          movie_id: id,
        },
      },
      {
        $lookup: {
          from: "people",
          localField: "person_id",
          foreignField: "id",
          as: "information",
        },
      },
    ]);

    const crew = await this.crewModel.aggregate([
      {
        $match: {
          movie_id: id,
        },
      },
      {
        $lookup: {
          from: "people",
          localField: "person_id",
          foreignField: "id",
          as: "information",
        },
      },
    ]);

    const result = {
      id: id,
      cast: cast || [],
      crew: crew || [],
    };

    return result;
  }
}
