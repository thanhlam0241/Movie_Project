import { BaseService } from "./base.service";

// Create company service
import { ICompany } from "@/models/company.model";

export class CompanyService extends BaseService<ICompany> {
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
      .select("id name origin_country homepage headquarters -_id")
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
