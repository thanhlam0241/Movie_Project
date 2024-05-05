import { BaseController } from "./base.controller";
import { CreditService } from "@/service/credit.service";
import { PeopleService } from "@/service/people.service";
import { ICredit } from "@/models/credit.model";
import { getNumberString } from "@/helper/validate";
import { Request, Response } from "express";

class CreditController extends BaseController<ICredit> {
  protected peopleService = new PeopleService();
  constructor(service: CreditService) {
    super(service);
    console.log(this);
  }

  public getPeopleInCredits = async (req: Request, res: Response) => {
    try {
      const idMovie = getNumberString(req?.params?.id);
      const service = this.service as CreditService;
      const credit = await service.findCreditById(idMovie);

      if (!credit) {
        return res.status(404).send("Credit not found");
      }

      return res.json(credit);
    } catch (error: any) {
      res.status(500).send({ message: error?.message || error });
    }
  };
}

export { CreditController };
