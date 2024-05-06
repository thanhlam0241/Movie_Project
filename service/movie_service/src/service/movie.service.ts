import Movie, { IMovie } from "../models/movie.model";
// import { CreateQuery } from "mongoose";

export interface ResultPaginate {
  total: number;
  page: number;
  limit: number;
  data: IMovie[];
}

export interface UpdateModel {
  title?: string;
  overview?: string;
}

export interface CreateModel {
  title: string;
  overview: string;
}

async function getPaging(
  page: number,
  offset: number,
  sort: string,
  sort_order: 1 | -1 = 1
): Promise<ResultPaginate> {
  const count = await Movie.countDocuments().exec();
  const data = await Movie.find()
    .sort({ [sort]: sort_order })
    .skip(offset * (page - 1))
    .limit(offset)
    .exec();

  return {
    total: count,
    page,
    limit: offset,
    data,
  };
}

async function create(data: CreateModel): Promise<void> {
  const maxId = await Movie.find().sort({ id: -1 }).limit(1).exec();
  const newId = maxId[0].id + 1;
  const newMovie = new Movie({ id: newId, ...data });
  await newMovie.save();
}

async function getById(id: number): Promise<IMovie> {
  const result = await Movie.findOne({ id: id });
  if (!result) {
    throw new Error("Movie not found");
  }
  return result;
}

async function updateById(id: number, data: UpdateModel): Promise<void> {
  const isExist = await Movie.exists({ id: id });
  if (!isExist) {
    throw new Error("Movie not found");
  }
  await Movie.updateOne({ id: id }, data);
}

async function deleteById(id: number): Promise<void> {
  const isExist = await Movie.exists({ id: id });
  if (!isExist) {
    throw new Error("Movie not found");
  }
  await Movie.deleteOne({ id: id });
}

async function getByListId(ids: Number[]): Promise<IMovie[]> {
  const result = await Movie.find({ id: { $in: ids } });
  return result;
}

export { getPaging, getById, getByListId, updateById, create, deleteById };
