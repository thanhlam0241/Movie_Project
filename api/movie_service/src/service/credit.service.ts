import Credit, { ICredit } from "@/models/credit.model";

async function GetById(id: number) {
  const result = await Credit.findOne({ id: id });
  if (!result) {
    throw new Error("Credit not found");
  }
  return result;
}
