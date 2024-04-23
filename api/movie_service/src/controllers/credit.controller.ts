import { BaseController } from "./base.controller";
import { CreditService } from "@/service/credit.service";
import { PeopleService } from "@/service/people.service";
import { ICredit } from "@/models/credit.model";
import { getNumberString, getSortOrder } from "@/helper/validate";
import { Request, Response } from "express";

class CreditController extends BaseController<ICredit> {
    protected peopleService = new PeopleService();
    constructor(service: CreditService) {
        super(service);
    }

    async getPeopleInCredits(req: Request, res: Response) {
        try {
            const idMovie = getNumberString(req?.params?.movieId);

            const credit = await this.service.findById(idMovie);

            if (!credit) {
                return res.status(404).send("Credit not found");
            }

            const cast = credit?.cast;
            const crew = credit?.crew;

            const people = await this.peopleService.findByListId([...cast, ...crew]);

            const result = {
                cast: people.filter((person: any) => cast.includes(person.id)),
                crew: people.filter((person: any) => crew.includes(person.id))
            }

            return res.json(result);

        }
        catch (error: any) {
            res.status(500).send({ message: error?.message || error });
        }
    }

}

export { CreditController };