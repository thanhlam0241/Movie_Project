import Genre, { IGenre } from "../models/genre.model";

async function GetAll() {
  const result = await Genre.find();
  return result;
}

async function GetById(id: number) {
  const result = await Genre.findOne({ id: id });
  if (!result) {
    throw new Error("Genre not found");
  }
  return result;
}

async function GetListByIds(ids: number[]) {
  const result = await Genre.find({ id: { $in: ids } });
  return result;
}

async function Create(data: IGenre) {
  const newGenre = new Genre(data);
  await newGenre.save();
}

async function UpdateById(id: number, data: IGenre) {
  const isExist = await Genre.exists({ id: id });
  if (!isExist) {
    throw new Error("Genre not found");
  }
  await Genre.updateOne({ id: id }, data);
}

async function DeleteById(id: number) {
  const isExist = await Genre.exists({ id: id });
  if (!isExist) {
    throw new Error("Genre not found");
  }
  await Genre.deleteOne({ id: id });
}

export default {
  GetAll,
  GetById,
  Create,
  UpdateById,
  DeleteById,
  GetListByIds,
};
