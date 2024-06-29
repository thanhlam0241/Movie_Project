import { ICredit } from "@/models/credit.model";
import Crew, { ICrew } from "@/models/crew.model";
import Cast, { ICast } from "@/models/cast.model";
import People from "@/models/people.model";
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
    // const cast = await this.castModel.aggregate([
    //   {
    //     $limit: 5,
    //   },
    //   {
    //     $match: {
    //       movie_id: id,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "people",
    //       localField: "person_id",
    //       foreignField: "id",
    //       as: "information",
    //     },
    //   },
    // ]);

    // const crew = await this.crewModel.aggregate([
    //   {
    //     $limit: 5,
    //   },
    //   {
    //     $match: {
    //       movie_id: id,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "people",
    //       localField: "person_id",
    //       foreignField: "id",
    //       as: "information",
    //     },
    //   },
    // ]);

    const castResult = await this.castModel.find({ movie_id: id }).limit(6);
    const crewResult = await this.crewModel.find({ movie_id: id }).limit(6);
    console.log(castResult);
    const listPersonIdCast = castResult.map((item) => item.person_id);
    const listPersonIdCrew = crewResult.map((item) => item.person_id);
    const people = await People.find({
      $or: [
        { id: { $in: listPersonIdCast } },
        { id: { $in: listPersonIdCrew } },
      ],
    }).select("id name image");

    const cast: any[] = [];
    castResult.forEach((item) => {
      const person = people.find((p) => p.id === item.person_id);
      if (!person) {
        return;
      }
      cast.push({
        character: item.character,
        id: person.id,
        name: person.name,
        image: person.image,
      });
    });

    const crew: any[] = [];
    crewResult.forEach((item) => {
      const person = people.find((p) => p.id === item.person_id);
      if (!person) {
        return;
      }
      crew.push(person);
    });

    const result = {
      id: id,
      cast: cast || [],
      crew: crew || [],
    };

    return result;
  }
}
